
const productsArray = [
    {   id:1,
        stripeid: "price_1MtbntHz09nFNN1JB5EnvhCd",
        title: "Rule of Wolves (King of Scars Book 2)",
        author: "Leigh Bardugo",
        genre: "Romance",
        picture: "https://iili.io/HOxaaPj.jpg",
        price: 150
    },
    {id:2,
        stripeid: "price_1MtbqJHz09nFNN1JqRRaLhff",
        title: "It Ends With Us",
        author: "Colleen Hoover",
        genre: "Fiction",
        picture: "https://iili.io/HOxayxe.jpg",
        price: 140
    }, {id:3,
        stripeid: "price_1MtbqpHz09nFNN1JOIN9qD7I",
        title: "The Adventures of Sherlock Holmes",
        author: "Arthur Conan Doyle",
        genre: "Crime",
        picture: "https://iili.io/HOxcf5B.jpg",
        price: 35
    }, {id:4,
        stripeid: "price_1MtbrHHz09nFNN1JPnYqEXGq",
        title: "The Queen of Nothing (The Folk of the Air #3)",
        author: "Holly Black",
        genre: "Romance",
        picture: "https://iili.io/HOxcugR.jpg",
        price: 160
    }, {id:5,
        stripeid: "price_1MtbrkHz09nFNN1JAn1Pnkei",
        title: "Mrs Dalloway",
        author: "Virginia Woolf",
        genre: "Classic",
        picture: "https://iili.io/HOxc6mP.jpg",
        price: 35
    }, {id:6,
        stripeid: "price_1MtbsJHz09nFNN1JI4sHTTPD",
        title: "Around the World in Eighty Days",


        author: "Jules Verne",
        genre: "Classic",
        picture: " https://iili.io/HOxlf4f.jpg",
        price: 35
    }, {id:7,
        stripeid: "price_1MtbswHz09nFNN1JIzx2QOsT",
        title: "Jane Eyre",



        author: "Charlotte Bronte",
        genre: " Romance",
        picture: "https://iili.io/HOxlaYQ.jpg",
        price: 39
    }, {id:8,
        stripeid: "price_1MtbtrHz09nFNN1J86yGapEw",
        
        
        
        title: "House of Earth and Blood",
        author: "Sarah J. Maas",
        genre: "Fantasy",
        picture: "https://iili.io/HOxl1TP.jpg",
        price: 130
    }, {id:9,
        stripeid: "price_1MtbuEHz09nFNN1JnIMMmkL6",
        
       
        title: "Six Crimson Cranes",
        author: "Elizabeth Lim",
        genre: "Fiction",
        picture: "https://iili.io/HOxlmMu.png",
        price: 140
    }, {id:10,
        stripeid: "price_1MtbuaHz09nFNN1JYfQHmEqD",
        title: "A Court of Silver Flames",
        author: "Sarah J. Maas",
        genre: "Fiction",
        picture: "https://iili.io/HOx0WD7.jpg",
        price: 150
    },
];

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData };