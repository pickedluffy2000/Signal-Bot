import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

// Carregando o plugin de stealth
puppeteer.use(stealthPlugin());

async function pegarSinais() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', // caminho para o executável do Edge
        userDataDir: 'C:\\Usuários\\Desktop\\AppData\\Local\\Microsoft\\Edge\\User Data\\personal', // caminho para o diretório dos perfis do Edge
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    console.log('Iniciando navegador...');

    // Definindo o user agent
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    await page.setUserAgent(userAgent);

    // Adicionando cabeçalhos HTTP
    await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9',
    });

    // Definindo as dimensões da janela
    await page.setViewport({
        width: 1280,
        height: 800,
    });

    try {
        await page.goto('https://brazino777.com/pt/game/34165', {
            waitUntil: 'networkidle2',
            timeout: 9000000 // Aumenta o tempo limite para 1000 segundos
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

// Inicie a monitoração dos sinais
pegarSinais();
