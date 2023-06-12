var express = require("express");
var router = express.Router();

var mjml2html = require("mjml");
var bodyParser = require("body-parser");

router.post("/code", function (req, res, next) {
    try {
        const html = mjml2html(`
            <mjml>
                <mj-head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                    <mj-style>
                        * { 
                            padding: 0px;
                            margin: 0px;
                            box-sizing: border-box;
                        }
                        p {
                            margin: 0px;
                            line-height: 20px;
                        }
                    </mj-style>
                </mj-head>
                ${req.body.code}
            </mjml>
        `);
        console.log(html.html);
        res.json({
            data: html?.html,
            status: true,
            error: null,
            code: 200,
            message: "Request Success",
        });
    } catch (error) {
       
        res.json({
            data: null,
            status: false,
            error: { code: "Html Code Required" },
            code: 400,
        });
    }
});

module.exports = router;
