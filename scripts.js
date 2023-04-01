jQuery(document).ready(function($) {
    // onload
    window.onload = function() {
        c_w = view_width / 1920;

        var img_name = ["bocchi", "nijika", "ryo", "kita"];
        for (var i = 0; i <= 3; i++) {
            imgs_obj[i] = document.createElement("img");
            imgs_obj[i].src = "imgs/" + img_name[i] + ".png";
            imgs_obj[i].style.cursor = "pointer";
            imgs_obj[i].style.width = "240px";
            imgs_obj[i].style.position = "absolute";
            imgs_obj[i].style.display = "block";
            imgs_obj[i].style.opacity = "1";
            imgs_obj[i].style.zIndex = i + 10;
            imgs_obj[i].style.left = "-999px";
            imgs_obj[i].draggable = false;
            imgs_obj[i].style.transition = "top 0.9s, transform 0.06s";
            imgs_obj[i].style.transformOrigin = "top";
            imgs_obj[i].style.left = (i + 1) * 17.7 + "%";
            imgs_obj[i].style.top = "-300px";
            imgs_obj[i].style.transitionTimingFunction = "ease-in-out";
            imgs_obj[i].style.animation = "compare 2s infinite alternate";
            imgs_clicked[i] = 1;
            imgs_angle[i] = 0;
            $("input").after(imgs_obj[i]);
        }
        setTimeout(bocchi_BGappearance_anime, 100);
    }




    var obj_bocchi_bg = document.querySelector(".bocchi_bg");
    var obj_nijika_bg = document.querySelector(".nijika_bg");
    var obj_ryo_bg = document.querySelector(".ryo_bg");
    var obj_kita_bg = document.querySelector(".kita_bg");

    var ins_github_link = document.querySelector(".github_link");
    var ins_air_res = document.querySelector(".air_res");
    var ins_air_res_bar = document.querySelector(".air_res_bar");


    // set values for css
    var view_width = window.innerWidth;
    var c_w = view_width / 1920;
    var resizing0 = 14 * c_w;
    document.documentElement.style.setProperty("--text_size", resizing0 + "px");
    document.documentElement.style.setProperty("--skin_change_pos", view_width - resizing0 * 5 + "px");




    //return -1 or 1
    function irandom_return() {
        var random_value = Math.floor(Math.random() * 100 | 1);

        if (random_value <= 50) {
            return 1;
        }
        else {
            return -1;
        }
    }

    // image_values
    var imgs_obj = [], imgs_clicked = [], imgs_angle = [], imgs_max_angle = [], imgs_num = -1, direction = 0, n_dir = 1, t_dir = 0, mouse_x = 0, mouse_y = 0, n_draging_ele = -4;
    var background_img = -4, random_bg_n = -4;
    var air_resistence = 0.74;



    // set values for css
    var resizing0 = 14 * c_w;
    document.documentElement.style.setProperty("--text_size", resizing0 + "px")

    var resizing1 = 20 * c_w;
    document.documentElement.style.setProperty("--text_box_size", resizing1 + "px")

    document.documentElement.style.setProperty("--page_height", window.innerHeight + "px")
    var resizing2 = -210 * c_w;
    var resizing3 = -130 * c_w;
    document.documentElement.style.setProperty("--air_res_button_pos", resizing3 + air_resistence * 150 + "px")





    // step event
    setTimeout(step_event, 5);
    function step_event() { // 10 fps
        for (var k = 0; k <= 3; k++) {
            if (imgs_obj[k] != undefined) {
                if (imgs_max_angle[k] > 0) {
                    if (imgs_angle[k] >= imgs_max_angle[k] * 0.9) {
                        imgs_max_angle[k] *= -air_resistence * (abs(90 - imgs_max_angle[k]) / 82);
                    }
                    else {
                        imgs_angle[k] += (1 + abs(imgs_max_angle[k] - imgs_angle[k])) * 0.07;
                    }
                }

                if (imgs_max_angle[k] < 0) {
                    if (imgs_angle[k] <= imgs_max_angle[k] * 0.9) {
                        imgs_max_angle[k] *= -air_resistence * (abs(90 - imgs_max_angle[k]) / 82);
                    }
                    else {
                        imgs_angle[k] -= (1 + abs(imgs_max_angle[k] - imgs_angle[k])) * 0.07;
                    }
                }

                if (abs(imgs_max_angle[k]) < 0.2) {
                    imgs_angle[k] = 0;
                    imgs_max_angle[k] = 0;
                }

                imgs_obj[k].style.transform = "rotate(" + imgs_angle[k] + "deg)";
                // console.log("rotate"+imgs_angle[k]+" / "+imgs_max_angle[k]);
            }
        }

        setTimeout(step_event, 5);
    }








    // air resistence button
    document.querySelector(".air_res_bar").addEventListener("input", function() {
        air_resistence = (500 - document.getElementById("air_res_bar").value) / 500;
        // console.log("air_resistence"+air_resistence);
    })



    function sticking_anime_1(ii) {
        imgs_obj[ii].style.transition = "opacity 1s";
        imgs_obj[ii].style.opacity = 1;
    }




    // interaction
    addEventListener("click", function() {
        for (var ii = 0; ii <= 3; ii++) {
            imgs_obj[ii].addEventListener("click", sticker_interaction);
            imgs_obj[ii].param1 = ii;
        }
    })


    function sticker_interaction(evt) {
        var ii = evt.currentTarget.param1;
        var target_src = imgs_obj[ii].src;
        var random_angle = irandom_range(27, 30) * irandom_return();
        imgs_max_angle[ii] = random_angle;
        // console.log("imgs_max_angle"+imgs_max_angle);

        // check image file name and play sfx
        if (target_src.includes("kita")) {
            var audio = new Audio("sfx/kitaura.mp3");
            audio.pitchShift = false;
            audio.volume = 0.2;
            audio.play();
        }
    }




    // github link
    ins_github_link.addEventListener("mouseover", function() {
        ins_github_link.style.backgroundColor = "white";
        setting_now = 1;
    })

    ins_github_link.addEventListener("mouseleave", function() {
        ins_github_link.style.backgroundColor = "#ffffff00";
        setting_now = 0;
    })





    // BG anime
    function bocchi_BGappearance_anime() {
        obj_bocchi_bg.style.top = "-100px";
        setTimeout(nijika_BGappearance_anime, 200);
    }

    function nijika_BGappearance_anime() {
        obj_nijika_bg.style.top = "-100px";
        setTimeout(ryo_BGappearance_anime, 200);
    }

    function ryo_BGappearance_anime() {
        obj_ryo_bg.style.top = "-100px";
        setTimeout(kita_BGappearance_anime, 200);
    }

    function kita_BGappearance_anime() {
        obj_kita_bg.style.top = "-100px";
        setTimeout(bocchi_appearance_anime, 200);
    }

    // none BG anime
    function bocchi_appearance_anime() {
        var random_angle = irandom_range(15, 20) * irandom_return();
        imgs_max_angle[0] = random_angle;
        imgs_obj[0].style.top = "45%";
        setTimeout(nijika_appearance_anime, 200);
        setTimeout(bocchi_bounce_anime, 900);
    }

    function nijika_appearance_anime() {
        var random_angle = irandom_range(15, 20) * irandom_return();
        imgs_max_angle[1] = random_angle;
        imgs_obj[1].style.top = "45%";
        setTimeout(ryo_appearance_anime, 200);
        setTimeout(nijika_bounce_anime, 900);
    }

    function ryo_appearance_anime() {
        var random_angle = irandom_range(15, 20) * irandom_return();
        imgs_max_angle[2] = random_angle;
        imgs_obj[2].style.top = "45%";
        setTimeout(kita_appearance_anime, 200);
        setTimeout(ryo_bounce_anime, 900);
    }

    function kita_appearance_anime() {
        var random_angle = irandom_range(15, 20) * irandom_return();
        imgs_max_angle[3] = random_angle;
        imgs_obj[3].style.top = "45%";

        setTimeout(kita_bounce_anime, 900);
    }

    // bounce1
    function bocchi_bounce_anime() {
        imgs_obj[0].style.top = "33%";
        setTimeout(bocchi_bounce_anime2, 900);
    }

    function nijika_bounce_anime() {
        imgs_obj[1].style.top = "33%";
        setTimeout(nijika_bounce_anime2, 900);
    }

    function ryo_bounce_anime() {
        imgs_obj[2].style.top = "33%";
        setTimeout(ryo_bounce_anime2, 900);
    }

    function kita_bounce_anime() {
        imgs_obj[3].style.top = "33%";
        setTimeout(kita_bounce_anime2, 900);
        ins_github_link.style.opacity = 1;
        ins_air_res.style.opacity = 1;
        ins_air_res_bar.style.opacity = 1;
    }


    // bounce2
    function bocchi_bounce_anime2() {
        imgs_obj[0].style.top = "40%";
        setTimeout(bocchi_bounce_anime3, 900);
    }

    function nijika_bounce_anime2() {
        imgs_obj[1].style.top = "40%";
        setTimeout(nijika_bounce_anime3, 900);
    }

    function ryo_bounce_anime2() {
        imgs_obj[2].style.top = "40%";
        setTimeout(ryo_bounce_anime3, 900);
    }

    function kita_bounce_anime2() {
        imgs_obj[3].style.top = "40%";
        setTimeout(kita_bounce_anime3, 900);
    }


    // bounce3
    function bocchi_bounce_anime3() {
        imgs_obj[0].style.top = "36%";
        setTimeout(bocchi_bounce_anime2, 900);
    }

    function nijika_bounce_anime3() {
        imgs_obj[1].style.top = "36%";
        setTimeout(nijika_bounce_anime2, 900);
    }

    function ryo_bounce_anime3() {
        imgs_obj[2].style.top = "36%";
        setTimeout(ryo_bounce_anime2, 900);
    }

    function kita_bounce_anime3() {
        imgs_obj[3].style.top = "36%";
        setTimeout(kita_bounce_anime2, 900);
    }







    $(window).resize(function() {
        c_w = view_width / 1920;
    })
    //////////////////////////////////////////////////////////////////////////
})