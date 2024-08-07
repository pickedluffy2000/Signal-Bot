import puppeteer from 'puppeteer-core';

async function pegarSinais() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 
        userDataDir: 'C:\\Usuários\\Desktop\\AppData\\Local\\Microsoft\\Edge\\User Data\\personal',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    console.log('Iniciando navegador...');

    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    await page.setUserAgent(userAgent);

    await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9',
    });

    await page.setViewport({
        width: 1280,
        height: 800,
    });

    try {
        await page.goto('https://brazino777.com/pt/game/34165', {
            waitUntil: 'networkidle2',
            timeout: 90000000000 
        });

        // Função para pegar e processar sinais
        const pegarSinais = async () => {
            await page.waitForSelector('seletor_do_algoritmo_de_jogo');

            const sinais = await page.evaluate(() => {
                const elementos = document.querySelectorAll('seletor_do_algoritmo_de_jogo');
                return Array.from(elementos).map(el => el.textContent);
            });

            sinais.forEach(sinal => {
                if (sinal === 'condição_para_verde') {
                    console.log('\x1b[32m%s\x1b[0m', `Sinal Verde: ${sinal}`);
                } else {
                    console.log('\x1b[31m%s\x1b[0m', `Sinal Vermelho: ${sinal}`);
                }
            });
        };

        setInterval(pegarSinais, 30000);

    } catch (error) {
        console.error('Erro ao acessar o site:', error);
    }
}

pegarSinais();
