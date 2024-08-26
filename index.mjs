import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

// Carregando o plugin de stealth
puppeteer.use(stealthPlugin());

async function pegarSinais() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        userDataDir: 'C:\\Usuários\\Desktop\\AppData\\Local\\Microsoft\\Edge\\User Data\\personal',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    console.log('Iniciando navegador...');

    // Definindo o user agent
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    await page.setUserAgent(userAgent);

    // Definindo as dimensões da janela
    await page.setViewport({
        width: 1280,
        height: 800,
    });

    try {
        await page.goto('https://brazino777.com/pt/game/34165', {
            waitUntil: 'networkidle2',
            timeout: 300000 // 5 minutos
        });

        console.log('Navegador iniciado e monitorando...');

        // Função para capturar apenas informações do Spaceman e números (multiplicadores)
        const capturarInformacoesSpaceman = async () => {
            const dadosSpaceman = await page.evaluate(() => {
                // Filtra apenas os elementos que contenham o título ou identificadores de "Spaceman"
                const elementos = Array.from(document.querySelectorAll('*'));
                
                // Filtrar somente os elementos com o nome do jogo "Spaceman" ou que contenham números (multiplicadores)
                const resultado = elementos
                    .filter(el => {
                        const texto = el.textContent.trim();
                        // Verifica se contém "Spaceman" ou se é um número com "x"
                        return texto.includes('Spaceman') || /\d+x/.test(texto);
                    })
                    .map(el => el.textContent.trim());

                return resultado;
            });

            // Exibe os textos relacionados ao Spaceman e os multiplicadores no terminal
            console.log('Informações do Spaceman e Números:', dadosSpaceman);
        };

        // Captura as informações a cada 10 segundos
        setInterval(capturarInformacoesSpaceman, 10000);

    } catch (error) {
        console.error('Erro ao acessar o site:', error);
    }
}

// Inicie a monitoração dos sinais
pegarSinais();
