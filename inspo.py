import asyncio
from playwright.async_api import async_playwright

async def shot():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True, args=['--no-sandbox'])
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto('https://tumo.org', wait_until='networkidle', timeout=30000)
        await asyncio.sleep(3)
        
        for i, y in enumerate([900, 1800, 2700]):
            await page.evaluate(f"window.scrollTo(0, {y})")
            await asyncio.sleep(1)
            await page.screenshot(path=f'/home/revl/.openclaw/workspace/rrfoundation/tumo-{i+2}.jpg', type='jpeg', quality=90)
            print(f'shot {i+2}')
        
        await browser.close()

asyncio.run(shot())
