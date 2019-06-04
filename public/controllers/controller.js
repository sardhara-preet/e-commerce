const urlencoded = require('body-parser');

let items = [];
let globalCounter = 0;
let cart = [];

let urlencodedParser = urlencoded({extended: false});

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.sendFile('web.html', {root: `${__dirname}/../`});
    });

    app.get('/home/add/:id', function(req, res) {
        const ID = req.params.id;
        res.json(addToCart(ID));
    });

    app.get('/home/load/allitems', function(req, res) {
        res.json(items);
    });

    app.get('/home/load/cart', function(req, res) {
        res.json(cart);
    });

    app.get('/home/add/cart/:id', function(req, res) {
        cart.forEach(function(item) {
            if(item.id == req.params.id){
                item.count++;
            }
        });
        res.json('ok');
    });

    app.get('/home/dec/cart/:id', function(req, res) {
        cart.forEach(function(item) {
            if(item.id == req.params.id){
                item.count--;
            }
        });
        res.json('okay');
    });

    app.get('/home/rem/cart/:id', function(req, res) {
        cart.forEach(function(item, i) {
            if(item.id == req.params.id){
                item.count = 0;
                cart.splice(i, 1);
            }
        });
        res.json('okay');
    });

}

function addItem(name,price,stars,type,srcString,description) {
    const obj = {
        name,
        price,
        stars,
        type,
        srcString,
        description,
        id: globalCounter++
    };
    items.push(obj);
}

function addToCart(id) {
    let flag = 0;
    cart.forEach(function(item) {
        if(item.id == id){
            flag = 1;
        }
    });
    if(flag) {
        return 'Item is already added to the cart';
    }
    else{
        let index = -1;
        items.forEach(function(item,i) {
            if(item.id == id){
                index = i;
            }
        });
        cart.push(items[index]);
        cart[cart.length-1].count = 1;
        return 1;
    }
}

addItem('Samsung Galaxy Note 8',10000,4.2,'mobile','./images/items/electronics/mobiles/0.png',{
    'display size': '5.7 inch',
    'Resolution': '2560 x 1440 Pixels',
    'Resolution Type': 'Quad HDh',
    'GPU': 'ARM Mali-T760 MP8',
    'Display Type': 'Super AMOLED'
});

addItem('Redmi Note 4',11999,4.4,'mobile','./images/items/electronics/mobiles/0.png',{
    'display size': '5.5 inch',
    'Resolution': '1920 x 1080 Pixels',
    'Resolution Type': 'Full HD',
    'GPU': 'Ardeno 506',
    'Display Type': 'IPS'
});

addItem('Sony Xperia R1 Dual',12990,3.9,'mobile','./images/items/electronics/mobiles/0.png',{
    'display size': '5.2 inch',
    'Resolution': '1280 x 720 Pixels',
    'Resolution Type': 'HD',
    'GPU': 'ARM',
    'Display Type': 'Super AMOLED'
});

addItem('Apple Macbook Air',57990,4.7,'laptop','./images/items/electronics/laptops/0.png',{
    'Processor Brand': 'intel',
    'Processor Name': 'core i5',
    'Ram': '8 GB',
    'GPU': 'ARM Mali-T760 MP8',
    'Clock Speed': '1.8 GHz'
});

addItem('Chair',10000,4.2,'chair','./images/items/fernitures/chairs/0.png',{
    'display size': '5.7 inch',
    'Resolution': '2560 x 1440 Pixels',
    'Resolution Type': 'Quad HDh',
    'GPU': 'ARM Mali-T760 MP8',
    'Display Type': 'Super AMOLED'
});

addItem('Canon EOS 77D',10000,4.2,'camera','./images/items/electronics/cameras/0.png',{
    'display size': '5.7 inch',
    'Resolution': '2560 x 1440 Pixels',
    'Resolution Type': 'Quad HDh',
    'GPU': 'ARM Mali-T760 MP8',
    'Display Type': 'Super AMOLED'
});

addItem('LG',15000,4.5,'refrigarator','./images/items/appliances/refrigarators/0.png',{
    'display size': '5.7 inch',
    'Resolution': '2560 x 1440 Pixels',
    'Resolution Type': 'Quad HDh',
    'GPU': 'ARM Mali-T760 MP8',
    'Display Type': 'Super AMOLED'
});