import asyncio
from playwright.async_api import async_playwright
import os

html_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'index.html'))
url = f'file://{html_path}'
out_dir = os.path.dirname(__file__)

async def shot():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True, args=['--no-sandbox'])
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto(url, wait_until='networkidle')
        await asyncio.sleep(2)

        sections = [
            ('hero', '#home'),
            ('mission', '#mission'),
            ('orgs', '#organizations'),
            ('impact', '#impact'),
            ('contact', '#contact'),
        ]

        for name, sel in sections:
            el = await page.query_selector(sel)
            # Scroll the element into view
            await el.scroll_into_view_if_needed()
            await asyncio.sleep(0.8)
            await page.screenshot(
                path=f'{out_dir}/shot-{name}.jpg',
                type='jpeg',
                quality=92,
            )
            print(f'✓ {name}')

        await browser.close()
        print('done')

asyncio.run(shot())
