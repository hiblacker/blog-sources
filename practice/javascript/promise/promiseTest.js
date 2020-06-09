new Promise((resolve, reject) => {
    console.log(1);
    Promise.resolve();
    resolve();
})
    .then((res) => {
        console.log(2);
        Promise.resolve().then((res) => {
            console.log(4);
        });
        setTimeout(() => {
            console.log(6);
        });
        console.log(5);
    })
    .then((res) => {
        console.log(3);
    })
    .catch(() => console.log(7))
    .then(() => console.log(8));

