function el(type, class_names) {
    const new_el = document.createElement(type);
    if(class_names !== "") {
        if(typeof class_names === "string") {
            new_el.classList.add(class_names)
        } else if (typeof class_names === "object") {
            class_names.forEach(class_name => {
                new_el.classList.add(class_name)
            })
        } 
        else { console.error("Invalid class name syntax, el(type, class_names = Array or String)") }
    }
    
    return new_el;
}

function append_children(parent, arr) {
    arr.forEach(child => {
        if(child) {parent.appendChild(child)}
    })
}

function fix_width(el) {el.style.width = `${el.offsetWidth}px`;}

const random_strings = [
    "WVHHDwLnGc",
    "upKfsbmkby",
    "qlozJvlRIf",
    "zSrRDATMQs",
    "xPmPLdOPBS",
    "GZIObhysTI",
    "JZKgERDDnU",
    "uldZBRDLTq",
    "dZLYlFaSiN",
    "JlhusMxyrA",
    "mEryJmmEnD",
    "lZWosQFWHm",
    "IsDZemujGo",
    "mDjcCDlunL",
    "NFtXzkgaUZ",
    "yODcKFgSxp",
    "IgpLroSkyj",
    "BPlITpUyii",
    "btDYUeTZYA",
    "EYIjOIyWze",
    "XITtusnYXb",
    "pAHkvOynRv",
    "VJsSLtapOI",
    "NmoyXYNTlo",
    "FVoxFkjcAo",
    "MzRmNNbzvn",
    "oJobiFRFit",
    "bdkFioxaRZ",
    "tmdkkMFLFf",
    "McJCPzIicS",
    "niDqhdAErq",
    "yNkOmlTPFQ",
    "jsZcMjbDHa",
    "EbaiHoVwtq",
    "lRDBBJHgRi",
    "FRVRrJKjHz",
    "xHKnomFxfR",
    "rxvVixQqGY",
    "dCSxtbTDPk",
    "VOuBmsjEsH",
    "GIbWuWMJuA",
    "kgICtwTRSo"
];

const generic_text = `
 generous birthday money! I have used the total amount to buy a refurbished second hand DSLR camera.
 One reason why I have decided to buy this is because i am planning on filming a short film written 
 by two of my friends that requires a better sensor and lens to film in low light conditions
`

function create_response(obj, index, random_strings) {
    const response_container = el("div", "response-container");
    response_container.setAttribute("id", random_strings[index]);
    
        const overlay = el("div", ["overlay", "max"]);

        const button = el("button", "btn-minimise");
        button.textContent = 'Minimise Message';

        button.addEventListener("click", (e) => {
            response_container.classList.toggle("minimised");
            if(response_container.classList.contains("minimised")) {button.textContent = "Maximise Message"} else {{button.textContent = "Minimise Message"}}
        })

        const heading = el("h1", "");
        heading.textContent = `Dear ${obj.person},`;
        if(heading.textContent.length > 14) {heading.classList.add('fs-smaller')}

        const paragraph = el("p", "");

        let response_text = `Thank You so much for `;

        if(obj.generic) {
            response_text+=generic_text;
        } else {
            response_text+= obj.response;
        }

        response_text+= `<div class="line-break"></div>
        This plant is called the Alchemilla Mollis. I was interested by this plant I first 
        saw at Scotsdales (a local garden centre). I liked its unique shape and natural ability to hold water droplets. 
        I made this 3D render (not a photo!), combining 3D modelling and mathematical texturing.
        `
        
        paragraph.innerHTML = response_text;

        const from = el("h2", "from");
        from.textContent = "Love from Blake";

        if(document.body.offsetWidth < 600) {
            var rotate = el("p", "");
            rotate.textContent = "P.S Rotate your phone to see the full image";
        }

    append_children(response_container, [overlay, button, heading, paragraph, from, rotate]);

    return response_container;
}

fetch('./responses.json')
    .then(response => response.text())
    .then(text => {
        const obj = JSON.parse(text);
        obj.forEach( function(response, index) {
            const new_response = create_response(response, index, random_strings);
            new_response.style.display = "none";

            const id = window.location.href.split('#').pop();
            const response_id = new_response.getAttribute("id");

            if(id === response_id) {
                document.body.appendChild(new_response);
                new_response.style.display = "flex";

                const overlay = document.querySelector('.overlay');
                let overflow_height = new_response.scrollHeight - new_response.offsetHeight - 20;
                console.log(overflow_height)
                if(overflow_height > 0) {overlay.remove()}
            }
        })
    })


