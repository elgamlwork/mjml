var express = require("express");
var router = express.Router();

var mjml2html = require("mjml");
var bodyParser = require("body-parser");

router.post("/", function (req, res, next) {
    try {
        const html = mjml2html(`
            <mjml>
                <mj-head>
                @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900;1000&display=swap');
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                    <mj-style>
                        * { 
                            padding: 0px;
                            margin: 0px;
                            box-sizing: border-box;
                            font-family: Cairo;
                        }
                        p, a, b, i {
                            margin: 0px;
                            font-family: Cairo !important;
                        }
                        html,body { 
                            font-family: Cairo;
                        }
                        .align_center { text-align: center}
                        .align_left { text-align: left}
                        .align_right { text-align: right}
                        .align_full { text-align: center, width: 100%}
                    </mj-style>
                </mj-head>
                ${req.body.code}
            </mjml>
        `);
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
