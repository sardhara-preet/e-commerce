let items = [];
let types = new Set();
let globalCounter = 0;
let cart = [];
let bill = 0;

function addItem(name,price,stars,type,srcString,description) {
    items.push({
        name,
        price,
        stars,
        type,
        srcString,
        description,
        id: globalCounter++
    });
    types.add(type);
}

function addAllItems() {
    items.forEach(function(item) {
        show(item);
    });
}

function hideAll() {
    types.forEach(function(type) {
        let temp = document.getElementsByClassName(type);
        for(let i=0;i<temp.length;i++) {
            temp[i].style.display = 'none';
        }
    });
}

function showItems(_type) {
    hideAll();
    if(_type==='all'){
        document.getElementById('no_item').style.display = 'none';
        types.forEach(function(type) {
            let temp = document.getElementsByClassName(type);
            for(let i=0;i<temp.length;i++){
                temp[i].style.display = 'grid';
            }
        });
    }
    else{
        if(!types.has(_type)){
            document.getElementById('no_item').style.display = 'block';
        }
        else{
            document.getElementById('no_item').style.display = 'none';
            let temp = document.getElementsByClassName(_type);
            for(let i=0;i<temp.length;i++){
                temp[i].style.display = 'grid';
            }
        }
    }
}

function descriptionInString(obj) {
    let des = Object.keys(obj), str = '';
    for(let i=0;i<des.length;i++) {
        str+=`<b>${des[i]}:</b> ${obj[des[i]]}<br/>`;
    }
    return str;
}

function show(obj) {
    let par = document.getElementById('flex_container');
    let d = document.createElement('div');
    let temp = obj.description;
    let str = descriptionInString(temp);
    d.className = `item ${obj.type}`;
    d.id = obj.id;
    d.innerHTML = `<img class="img" src="${obj.srcString}"alt="image" />
                    <p class="name">${obj.name}</p>
                    <p class="price">Rs. ${obj.price}<span class="star">${obj.stars} <i class="fa fa-star"></i></span></p>
                    <p class="description">${str}</p>
                    <button class="addToCart" onclick="addToCart(${obj.id})"><i class="fa fa-shopping-cart"></i> Add to Cart</button>`
    par.appendChild(d);
}

function searchFunction() {
    let input = document.getElementById('search');
    console.log(input);
    let text = input.value.toUpperCase();
    let counter = 0;
    for(let i=0;i<items.length;i++) {
        let name = items[i].name.toUpperCase();
        console.log(name,text,items[i].id);
        if(name.indexOf(text) > -1){
            console.log(name);
            document.getElementById(items[i].id).style.display = 'grid';
            counter++;
        }
        else{
            document.getElementById(items[i].id).style.display = 'none';
        }
    }
    if(counter) {
        document.getElementById('no_item').style.display = 'none';
    }
    else{
        document.getElementById('no_item').style.display = 'block';
    }
}

function addToBill() {
    items = JSON.parse(localStorage.items);
    types = JSON.parse(localStorage.types);
    globalCounter = JSON.parse(localStorage.globalCounter);
    cart = JSON.parse(localStorage.cart);
    bill = JSON.parse(localStorage.bill);
    cart.forEach(function(obj) {
        let d =document.createElement('div');
        d.className = "billItem";
        d.id = `b${obj.id}`;
        billGlobalCounter++;
        d.innerHTML = `<img class="img" src="${obj.srcString}" alt="image" />
                        <div class="name">${obj.name}</div>
                        <div class="price">Rs. ${obj.price}</div>
                        <div class="quantity">
                            <button class="plus" onclick="addQuantity('${obj.id}')">+</button>
                            <input class="val" type="text" value="1" />
                            <button class="minus" onclick="decreaseQuantity('${obj.id}')">-</button>
                        </div>
                        <button class="remove">Remove <i class="fa fa-close"></i></button>`
        document.getElementsByClassName('billBody')[0].appendChild(d);
    })
}

function addQuantity(id) {
    cart.forEach(function(item) {
        if(item.id == id) {
            item.count++;
            document.getElementById(`b${item.id}`).getElementsByClassName('quantity')[0].innerHTML = 
                            `<button class="plus" onclick="addQuantity('${obj.id}')">+</button>
                            <input class="val" type="text" value="${item.count}" />
                            <button class="minus" onclick="decreaseQuantity('${obj.id}')">-</button>`
            
        }
    })
}

function decreaseQuantity(id) {
    cart.forEach(function(item) {
        if(item.id == id) {
            item.count--;
            document.getElementById(`b${item.id}`).getElementsByClassName('quantity')[0].innerHTML = 
                            `<button class="plus" onclick="addQuantity('${obj.id}')">+</button>
                            <input class="val" type="text" value="${item.count}" />
                            <button class="minus" onclick="decreaseQuantity('${obj.id}')">-</button>`
            
        }
    })
}

function addToCart(id) {
    let flag = 0;
    cart.forEach(function(item) {
        if(item.id == id){
            flag = 1;
        }
    });
    if(flag) {
        alert('Item is already added to the cart');
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
    }
    let element = document.getElementById('totalItems');
    element.remove();
    let d = document.createElement('div');
    d.id = 'totalItems';
    d.innerHTML = cart.length;
    document.getElementsByClassName('head')[0].appendChild(d);
    localStorage.items = JSON.stringify(items);
    localStorage.types = JSON.stringify(types);
    localStorage.globalCounter = JSON.stringify(globalCounter);
    localStorage.cart = JSON.stringify(cart);
    localStorage.bill = JSON.stringify(bill);
}

addItem('Samsung Galaxy Note 8',10000,4.2,'mobile','./images/items/electronics/mobiles/0.png',{
    'display size': '5.7 inch',
    'Resolution': '2560 x 1440 Pixels',
    'Resolution Type': 'Quad HDh',
    'GPU': 'ARM Mali-T760 MP8',
    'Display Type': 'Super AMOLED'
});

addItem('Samsung Galaxy Note 8',10000,4.2,'mobile','./images/items/electronics/mobiles/0.png',{
    'display size': '5.7 inch',
    'Resolution': '2560 x 1440 Pixels',
    'Resolution Type': 'Quad HDh',
    'GPU': 'ARM Mali-T760 MP8',
    'Display Type': 'Super AMOLED'
});

addItem('Samsung Galaxy Note 8',10000,4.2,'mobile','./images/items/electronics/mobiles/0.png',{
    'display size': '5.7 inch',
    'Resolution': '2560 x 1440 Pixels',
    'Resolution Type': 'Quad HDh',
    'GPU': 'ARM Mali-T760 MP8',
    'Display Type': 'Super AMOLED'
});

addItem('Samsung Galaxy Note 8',10000,4.2,'mobile','./images/items/electronics/mobiles/0.png',{
    'display size': '5.7 inch',
    'Resolution': '2560 x 1440 Pixels',
    'Resolution Type': 'Quad HDh',
    'GPU': 'ARM Mali-T760 MP8',
    'Display Type': 'Super AMOLED'
});

addItem('Samsung Galaxy Note 8',10000,4.2,'mobile','./images/items/electronics/mobiles/0.png',{
    'display size': '5.7 inch',
    'Resolution': '2560 x 1440 Pixels',
    'Resolution Type': 'Quad HDh',
    'GPU': 'ARM Mali-T760 MP8',
    'Display Type': 'Super AMOLED'
});

addItem('Samsung Galaxy Note 8',10000,4.2,'mobile','./images/items/electronics/mobiles/0.png',{
    'display size': '5.7 inch',
    'Resolution': '2560 x 1440 Pixels',
    'Resolution Type': 'Quad HDh',
    'GPU': 'ARM Mali-T760 MP8',
    'Display Type': 'Super AMOLED'
});

addItem('LG',15000,4.5,'refrigarator','./images/items/electronics/mobiles/0.png',{
    'display size': '5.7 inch',
    'Resolution': '2560 x 1440 Pixels',
    'Resolution Type': 'Quad HDh',
    'GPU': 'ARM Mali-T760 MP8',
    'Display Type': 'Super AMOLED'
});