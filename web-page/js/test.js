function add() {
    var a, b;

    a = document.getElementById('dig1').value;
    a = parceInt(a);

    b = document.getElementById('dig2').value;
    b = parceInt(b);
    // resAdd = parseInt(resAdd);

    console.log(a + b);
}

// function sub() {
//     var a, b;

//     a = document.getElementById('dig1').value;
//     a = parceInt(a);

//     b = document.getElementById('dig2').value;
//     b = parceInt(b);

//     console.log(a - b);
// }