const http = require('http')
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        let data = fs.readdirSync("./", "utf-8")
        // console.log(data)

        res.writeHead(201, { 'Content-Type': 'text/html' })
        data.forEach((el, i) => {
            res.write(`<h3> <li> <a href = ${el}> ${el} </a></li> </h3>`)
        })

        res.end()
    }

    else if (req.url !== "/favicon.ico") {
        // console.log(req.url)

        let check = fs.statSync(`.${req.url}`).isDirectory()

        if(check==false){
            let data = fs.readFileSync(`.${req.url}`, 'utf-8')
            res.end(data)
        }else{

            let data = fs.readdirSync(`.${req.url}`, "utf-8")
            // console.log(data)
    
            res.writeHead(201, { 'Content-Type': 'text/html' })


            data.forEach((el,i)=>{
                res.write(`<h3> <li> <a href = ${req.url}/${el}> ${el} </a></li> </h3>`)
            })

            res.end()
        }
       

       
    }
})

server.listen(8081, () => {
    console.log(`server is running on 8081`)
})