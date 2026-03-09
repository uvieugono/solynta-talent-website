"""
Configure Namecheap DNS for solyntatalent.com -> Vercel.
Opens the browser, lets you log in manually, then automates DNS setup.
"""
import time
import os
from playwright.sync_api import sync_playwright

DOMAIN = "solyntatalent.com"


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=200)
        context = browser.new_context(viewport={"width": 1400, "height": 900})
        page = context.new_page()
        page.set_default_timeout(60000)

        # --- Step 1: Login ---
        print("[1/4] Logging into Namecheap...")
        page.goto("https://www.namecheap.com/myaccount/login/", wait_until="domcontentloaded", timeout=90000)
        time.sleep(5)

        # Fill login with username (not email)
        username_input = page.get_by_role("textbox", name="Your username")
        username_input.click()
        time.sleep(0.3)
        page.keyboard.type("uvieugono", delay=50)

        password_input = page.locator("input[name='LoginPassword']").last
        password_input.click(force=True)
        time.sleep(0.3)
        page.keyboard.type("Ava-Grace4", delay=50)

        # Click Sign In
        page.locator("button:has-text('Sign in'), button:has-text('SIGN IN')").last.click(force=True)
        time.sleep(3)

        print("    Login submitted. Waiting for dashboard...")
        print("    >>> Solve any CAPTCHA in the browser if prompted <<<\n")

        # Wait up to 5 minutes for login to complete
        for i in range(300):
            time.sleep(1)
            url = page.url.lower()
            if "dashboard" in url or "myaccount" in url and "login" not in url:
                print(f"    Login detected! URL: {page.url}")
                break
            if i % 15 == 14:
                print(f"    Still waiting... ({i+1}s) Current: {page.url}")
        else:
            print("    Timed out waiting for login. Proceeding anyway...")

        time.sleep(3)

        # --- Step 2: Navigate to Advanced DNS ---
        print(f"[2/4] Navigating to {DOMAIN} Advanced DNS...")
        dns_url = f"https://ap.www.namecheap.com/Domains/DomainControlPanel/{DOMAIN}/advancedns"
        page.goto(dns_url, wait_until="domcontentloaded", timeout=90000)
        time.sleep(5)

        page.screenshot(path="scripts/debug/nc_dns_page.png")
        print(f"    DNS page loaded: {page.url}")

        # --- Step 3: Delete existing conflicting records ---
        print("[3/4] Looking for existing records to clean up...")
        time.sleep(3)

        # Scroll to host records section
        try:
            host_section = page.locator("text=HOST RECORDS, h2:has-text('Host Records'), text=Host Records").first
            host_section.scroll_into_view_if_needed()
            time.sleep(2)
        except:
            pass

        page.screenshot(path="scripts/debug/nc_records.png")

        # Try to find and delete existing A @ and CNAME www records
        # Namecheap uses a table with action buttons per row
        deleted_any = False
        for _ in range(5):
            rows = page.locator("[class*='record'], tr").all()
            found = False
            for row in rows:
                try:
                    text = row.inner_text(timeout=2000).lower()
                except:
                    continue

                is_a_at = ("a record" in text and "@" in text.split("\n")[0:3].__repr__())
                is_cname_www = ("cname" in text and "www" in text.split("\n")[0:3].__repr__())

                if is_a_at or is_cname_www:
                    print(f"    Found record to delete: {text[:60].replace(chr(10), ' | ')}")
                    try:
                        del_btn = row.locator("[class*='delete'], [class*='remove'], [title*='emove'], [title*='elete'], .fa-trash, button:last-child")
                        if del_btn.count() > 0:
                            del_btn.first.click()
                            time.sleep(1)
                            # Confirm if dialog
                            confirm = page.locator("button:has-text('Yes'), button:has-text('OK'), button:has-text('Confirm'), button:has-text('DELETE')")
                            if confirm.count() > 0:
                                confirm.first.click()
                                time.sleep(2)
                            deleted_any = True
                            found = True
                            print("    Deleted!")
                            break
                    except Exception as e:
                        print(f"    Delete failed: {e}")
            if not found:
                break
            time.sleep(1)

        if not deleted_any:
            print("    No conflicting records found (or couldn't auto-delete).")

        # --- Step 4: Add new records ---
        print("[4/4] Adding DNS records...")
        page.screenshot(path="scripts/debug/nc_before_add.png")

        for record in [
            {"type": "A Record", "host": "@", "value": "76.76.21.21"},
            {"type": "CNAME Record", "host": "www", "value": "cname.vercel-dns.com"},
        ]:
            print(f"\n    Adding: {record['type']} | {record['host']} | {record['value']}")

            # Click "Add New Record"
            add_btn = page.locator("button:has-text('ADD NEW RECORD'), button:has-text('Add new record'), button:has-text('Add Record')")
            if add_btn.count() > 0:
                add_btn.first.click()
                time.sleep(2)
                print("    Clicked 'Add New Record'")
            else:
                print("    WARNING: Could not find 'Add New Record' button")
                page.screenshot(path=f"scripts/debug/nc_no_add_{record['host']}.png")
                continue

            page.screenshot(path=f"scripts/debug/nc_new_row_{record['host']}.png")

            # Select type from dropdown (the last/newest select element)
            try:
                selects = page.locator("select").all()
                if selects:
                    last_select = selects[-1]
                    last_select.select_option(label=record["type"])
                    time.sleep(1)
                    print(f"    Selected type: {record['type']}")
            except Exception as e:
                print(f"    Could not select type: {e}")

            # Fill host (last host input)
            try:
                host_inputs = page.locator("input[placeholder*='Host'], input[name*='HostName'], input[placeholder*='host']").all()
                if host_inputs:
                    host_inputs[-1].fill(record["host"])
                    time.sleep(0.5)
                    print(f"    Filled host: {record['host']}")
            except Exception as e:
                print(f"    Could not fill host: {e}")

            # Fill value (last value input)
            try:
                value_inputs = page.locator("input[placeholder*='Value'], input[placeholder*='IP'], input[placeholder*='Point'], input[placeholder*='Target'], input[name*='Address']").all()
                if value_inputs:
                    value_inputs[-1].fill(record["value"])
                    time.sleep(0.5)
                    print(f"    Filled value: {record['value']}")
            except Exception as e:
                print(f"    Could not fill value: {e}")

            # Save this record (green checkmark / save button on the row)
            try:
                save_btns = page.locator("[class*='save'], button[title*='Save'], .fa-check, [class*='confirm']").all()
                if save_btns:
                    save_btns[-1].click()
                    time.sleep(3)
                    print("    Saved!")
            except Exception as e:
                print(f"    Could not save: {e}")

            page.screenshot(path=f"scripts/debug/nc_after_{record['host']}.png")

        # Try global save
        save_all = page.locator("button:has-text('Save All'), button:has-text('SAVE ALL')")
        if save_all.count() > 0:
            save_all.first.click()
            time.sleep(3)
            print("\n    Clicked 'Save All Changes'")

        page.screenshot(path="scripts/debug/nc_final.png")

        print("\n" + "=" * 60)
        print("DONE! Browser is still open for you to verify.")
        print("=" * 60)
        print(f"\nExpected DNS records:")
        print(f"  A Record     | @   | 76.76.21.21")
        print(f"  CNAME Record | www | cname.vercel-dns.com")
        print(f"\nIf automation missed anything, edit manually now.")
        print(f"\nBrowser will stay open for 3 minutes for manual edits...")

        # Keep browser open for manual verification
        time.sleep(180)
        browser.close()


if __name__ == "__main__":
    os.makedirs("scripts/debug", exist_ok=True)
    run()
