const Database = require("./config")

const initDb = {
    async init() {   //sempre que for usar await, ele tem que estar dentro de uma 
        //função async (assincrona)
        const db = await Database()  //iniciar a conexão com o banco de dados
        //a cont db pega or resultado da inicialização(a conexão)
        //await para fazer o codigo esperar o banco de dados terminar de abrir
        //antes de continuar o codigo para nao bugar o resto do codigo
        await db.exec(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    image TEXT,
    description TEXT,
    pricing TEXT,
    promo TEXT,
    flavours TEXT
        )`)

        await db.run(`INSERT INTO products (
        name,
        image,
        description,
        pricing,
        promo
        ) VALUES (
        "Paçoquita",
        '/images/pacoca.png',
        'Paçocas Paçoquita, o melhor do amendoim, quem prova comprova.',
        'Saindo a R$0,50',
        '3 por R$1,00'
        )`)
        await db.run(`INSERT INTO products (
            name,
            image,
            description,
            pricing,
            promo,
            flavours
            ) VALUES (
            "Bala Chita",
            '/images/balachita.png',
            'As clássicas balas chita, em diversos sabores para cada cliente.',
            'Saindo avulsa a R$0,05',
            'pacote com 12 saindo a R$0,50.',
            'Abacaxi,Framboesa,Menta,Uva'
        )`)
        await db.run(`INSERT INTO products (
            name,
            image,
            description,
            pricing,
            promo,
            flavours
            ) VALUES (
            "Bala Azedinha",
            '/images/azedinha.png',
            'Balas azedinhas, um sabor viciante que todos adoram.',
            'Saindo avulsa a R$0,05',
            'pacote com 12 saindo a R$0,50.',
            'Morango,Tangerina,Uva,Melancia'
        )`)
        await db.run(`INSERT INTO products (
            name,
            image,
            description,
            pricing,
            promo,
            flavours
            ) VALUES (
            "Bala Icekiss",
            '/images/icekiss.png',
            'Balas icekiss, as balas mais refrescantes para adoçar seu dia.',
            'Saindo avulsa a R$0,05',
            'pacote com 12 saindo a R$0,50.',
            'Extra forte,Eucalipto,Morango,Melão,Cereja'
        )`)
        await db.run(`INSERT INTO products (
            name,
            image,
            description,
            pricing,
            promo,
            flavours
            ) VALUES (
            "Bala Icekiss Tentação",
            '/images/icekisschoc.png',
            'Balas icekiss recheadas com chocolate, a refrescancia de sempre com mais uma camada de sabor.',
            'Saindo avulsa a R$0,05',
            'pacote com 12 saindo a R$0,50.',
            'Morango,Menta,Tangerina'
        )`)
        await db.run(`INSERT INTO products (
            name,
            image,
            description,
            pricing,
            promo
            ) VALUES (
            "Brigadeiro Caseiro",
            '/images/brigadeiro.png',
            'Brigadeiros caseiros, tão bons que tenho dó de vender.',
            'Saindo a R$1,00',
            '3 por R$2,00'
    
            )`)
        await db.run(`INSERT INTO products (
                name,
                image,
                description,
                pricing,
                promo,
                flavours
                ) VALUES (
                "Bala Lilith",
                '/images/lilith.png',
                'Balas lilith, um sabor inconfundível',
                'Saindo avulsa a R$0,05',
                'pacote com 12 saindo a R$0,50.',
                'Morango,Framboesa,Maçã Verde'
            )`)
        await db.run(`INSERT INTO products (
                name,
                image,
                description,
                pricing,
                promo,
                flavours
                ) VALUES (
                "Caramelos",
                '/images/caramelo.png',
                'Caramelos, a melhor maneira de adoçar seu dia',
                'Saindo avulsa a R$0,20',
                'Pacote com 6 R$1,00',
                'Leite,Leite e Chocolate'
            )`)

        await db.close()    //terminar connexão

    }

}

initDb.init()