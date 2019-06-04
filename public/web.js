let bill = 0;
let totalQuantity = 0;

function addToCart(id) {
    $.ajax({
        type: 'get',
        url: `/home/add/${id}`,
        success: function(data){
            if(typeof(data) === 'string'){
                alert(data);
            }
            showTotalCartIteams();
        }
    });
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

function showTotalCartIteams() {
    let element = document.getElementById('totalItems');
    element.remove();
    let d = document.createElement('div');
    d.id = 'totalItems';
    $.ajax({
        type: 'get',
        url: `/home/load/cart`,
        success: function(cart){
            console.log(cart);
            if(cart.length){
                d.innerHTML = cart.length;
            }
            document.getElementsByClassName('head')[0].appendChild(d);
        }
    });
}

function addAllItems() {
    $.ajax({
        type: 'get',
        url: `/home/load/allitems`,
        success: function(data){
            data.forEach(function(obj) {
                show(obj);
            });
        }
    });
    showTotalCartIteams();
}

function searchFunction() {
    let input = document.getElementById('search');
    let text = input.value.toUpperCase();
    let counter = 0;
    $.ajax({
        type: 'get',
        url: `/home/load/allitems`,
        success: function(items){
            for(let i=0;i<items.length;i++) {
                let name = items[i].name.toUpperCase();
                if(name.indexOf(text) > -1){
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
    });
}

function showItems(_type) {
    $.ajax({
        type: 'get',
        url: `/home/load/allitems`,
        success: function(items){
            items.forEach(function(item) {
                document.getElementById(`${item.id}`).style.display = 'none';
            });
            if(_type==='all'){
                document.getElementById('no_item').style.display = 'none';
                items.forEach(function(item) {
                    document.getElementById(`${item.id}`).style.display = 'grid';
                });
            }
            else{
                let temp = document.getElementsByClassName(_type);
                if(temp.length){
                    document.getElementById('no_item').style.display = 'none';
                    for(let i=0;i<temp.length;i++){
                        temp[i].style.display = 'grid';
                    }
                }
                else{
                    document.getElementById('no_item').style.display = 'block';
                }
            }
        }
    });
}

function addToBill() {
    $.ajax({
        type: 'get',
        url: `/home/load/cart`,
        success: function(cart){
            cart.forEach(function(obj) {
                let d =document.createElement('div');
                d.className = "billItem";
                d.id = `b${obj.id}`;
                bill += (obj.price)*(obj.count);
                totalQuantity += obj.count;
                d.innerHTML = `<img class="img" src="${obj.srcString}" alt="image" />
                                <div class="name">${obj.name}</div>
                                <div class="price">Rs. ${obj.price}</div>
                                <div class="quantity">
                                    <button class="plus" onclick="addQuantity('${obj.id}')">+</button>
                                    <input class="val" type="text" value="${obj.count}" />
                                    <button class="minus" onclick="decreaseQuantity('${obj.id}')">-</button>
                                </div>
                                <button class="remove" onclick="removeItemFromBill('${obj.id}')">Remove <i class="fa fa-close"></i></button>`
                document.getElementsByClassName('billBody')[0].appendChild(d);
            });
            document.getElementById('ammount').innerHTML = `Rs. ${bill}`;
            document.getElementById('totalQuantity').innerHTML = `${totalQuantity}`;
        }
    });
}

function addQuantity(id) {
    $.ajax({
        type: 'get',
        url: `/home/load/cart`,
        success: function(cart){
            cart.forEach(function(item) {
                if(item.id == id) {
                    if(item.count == 3) {
                        alert('This is the maximum quantity');
                    }
                    else{
                        totalQuantity++;
                        item.count++;
                        document.getElementById(`b${item.id}`).getElementsByClassName('quantity')[0].innerHTML =
                                        `<button class="plus" onclick="addQuantity('${item.id}')">+</button>
                                        <input class="val" type="text" value="${item.count}" />
                                        <button class="minus" onclick="decreaseQuantity('${item.id}')">-</button>`
                        bill += item.price;
                        $.ajax({
                            type: 'get',
                            url: `/home/add/cart/${id}`,
                            success: function(data){
                            }
                        });
                    }
                }
            });
            document.getElementById('ammount').innerHTML = `Rs. ${bill}`;
            document.getElementById('totalQuantity').innerHTML = `${totalQuantity}`;
        }
    });
}

function decreaseQuantity(id) {
    $.ajax({
        type: 'get',
        url: `/home/load/cart`,
        success: function(cart){
            cart.forEach(function(item) {
                if(item.id == id) {
                    if(item.count == 0) {
                        alert('This is the minimum quantity');
                    }
                    else{
                        totalQuantity--;
                        item.count--;
                        document.getElementById(`b${item.id}`).getElementsByClassName('quantity')[0].innerHTML =
                                        `<button class="plus" onclick="addQuantity('${item.id}')">+</button>
                                        <input class="val" type="text" value="${item.count}" />
                                        <button class="minus" onclick="decreaseQuantity('${item.id}')">-</button>`
                        bill -= item.price;
                        $.ajax({
                            type: 'get',
                            url: `/home/dec/cart/${id}`,
                            success: function(data){
                            }
                        });
                    }
                }
            });
            document.getElementById('ammount').innerHTML = `Rs. ${bill}`;
            document.getElementById('totalQuantity').innerHTML = `${totalQuantity}`;
        }
    });
}

function removeItemFromBill(id) {
    $.ajax({
        type: 'get',
        url: `/home/load/cart`,
        success: function(cart){
            cart.forEach(function(item) {
                if(item.id == id) {
                    totalQuantity -= item.count;
                    bill -= item.price * item.count;
                    document.getElementById(`b${item.id}`).remove();
                }
            });
            document.getElementById('ammount').innerHTML = `Rs. ${bill}`;
            document.getElementById('totalQuantity').innerHTML = `${totalQuantity}`;
            $.ajax({
                type: 'get',
                url: `/home/rem/cart/${id}`,
                success: function(data){
                }
            });
        }
    });
}