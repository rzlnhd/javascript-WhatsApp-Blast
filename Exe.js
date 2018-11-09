// ==UserScript==
// @name         WhatsApp Blast
// @description  Tools yang digunakan untuk mengirim pesan WhatsApp Secara Otomatis.
// @copyright    2018, rzlnhd (https://openuserjs.org//users/rzlnhd)
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @icon         https://i.imgur.com/H5XHdYV.png
// @homepageURL  https://openuserjs.org/scripts/rzlnhd/WhatsApp_Blast
// @supportURL   https://openuserjs.org/scripts/rzlnhd/WhatsApp_Blast/issues
// @version      2.2.4
// @date         2018-11-9
// @author       Rizal Nurhidayat
// @match        https://web.whatsapp.com/
// @grant        none
// @updateURL    https://openuserjs.org/meta/rzlnhd/WhatsApp_Blast.meta.js
// @downloadURL  https://openuserjs.org/install/rzlnhd/WhatsApp_Blast.user.js
// ==/UserScript==

// ==OpenUserJS==
// @author       rzlnhd
// ==/OpenUserJS==

var timer = setInterval(general,1000);
function general(){
    if(document.getElementsByClassName("swl8g")[0] != null){
        var item2 = document.getElementsByClassName("_3auIg")[0];
        var panel = document.getElementsByClassName("swl8g")[0];
        var element = item2.cloneNode(true);
        element.style.zIndex = 0;
        element.style['background-color'] = '#fed859';
        element.style['justify-content'] = 'flex-start';
        element.style.display = 'block';
        element.style.height = 'auto';
        element.innerHTML =
            "<style>textarea{-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;width: 100%;}</style>"
            +"<div style='margin-top:5px;'><textarea rows='7' id='message' class='copyable-text selectable-text'></textarea></div>"
            +"<div style='margin-top:2px;display:none;padding:10px 5px;background:rgb(0, 0, 0, 0.1);' id='c_bc'>"
            +"<input type='checkbox' id='s_bc' name='s_bc' value='s_bc' title='Super BC?' style='width:1.5em;height:1.5em;position:relative;float:left;display:block;top:1px;margin-right:2px;'>"
            +"<span>Atur Target untuk Super BC? : </span><input type='number' id='t_bp' name='t_bp' min='150' max='250' step='5' value='150' style='width:50px;' disabled><span> BP</span></div>"
            +"<div style='height:2px;width:100%;display:block;background:#888;margin:5px 0;'></div>"
            +"<div style='margin-top: 5px;'><input type='checkbox' name='automatic' id='auto' value='Auto' title='Blast Automatic?' style='width:1.5em;height:1.5em;position:relative;float:left;display:block;top:1px;margin-right:2px;'> "
            +"<input type='file' accept='.csv,.txt' id='getFile' name='files' style='width:180px;cursor:pointer;'>"
            +"<div id='spam' data-icon=\"send\" class=\"img icon icon-send\" title='BLAST!' style='float:right;cursor:pointer;'>"
            +"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path opacity=\".4\" d=\"M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z\"></path></svg></div></div>";
        panel.insertBefore(element, panel.childNodes[1]);
        document.getElementById("spam").addEventListener("click", spam);
        document.getElementById("s_bc").addEventListener("click", superBC);
        document.getElementById("message").addEventListener("input", superBC);
        console.log("WhatsApp Blast v2.2.2 - Blast Your Follow Up NOW!");
        clearInterval(timer);
    } else{
        console.log("WhatsApp Blast v2.2.2 - Waiting for WhatsApp to load...");
    }
}

function dispatch(input, message) {
    InputEvent = Event || InputEvent;
    var evt = new InputEvent('input', {bubbles: true, composer: true});
    input.innerHTML = message;
    input.dispatchEvent(evt);
}

var mesej = function (nama, phone, bp, date){
    var abs_link = 'https://api.whatsapp.com/send?phone=',
        _bp=parseInt(bp),bp_,obj = document.getElementById('message').value,
        c_bc = document.getElementById('s_bc').checked,
        s_bp=document.getElementById('t_bp').value,
        msg = obj.replace(/F_NAMA/g,set_name(nama,1)).replace(/NAMA/g,set_name(nama,0)),
        t_bp = 100;
    if(obj.includes("BC")){if(c_bc){t_bp=s_bp;}else{t_bp=150;}}
    if(bp!=null){
        if(bp.length<=3){bp_=t_bp-_bp;msg = msg.replace(/P_BP/g,_bp+" BP").replace(/K_BP/g,bp_+" BP");}
        else{msg = msg.replace(/L_DAY/g,getLastDay(bp));}
    }
    if(date!=null){msg = msg.replace(/L_DAY/g,getLastDay(date));}
    var en_msg = encodeURIComponent(msg).replace(/'/g,"%27").replace(/"/g,"%22");
    return abs_link+setPhone(phone)+'&text='+en_msg;
}

var set_name = function(nama,opt){
    var fname=nama.split(' '),count=fname.length;
    if(opt==0){
        if(count>1){return titleCase(fname[0]);}else{return titleCase(nama);}
    }else{
        var new_name="";
        for(var i=0;i<count;i++){
            if(i==0){new_name+=titleCase(fname[i]);}else{new_name+=" "+titleCase(fname[i]);}
        }
        return new_name;
    }
}

function titleCase(str) {
    var _str = str.toLowerCase();
    return _str.charAt(0).toUpperCase()+_str.slice(1);
}

var setPhone = function(phone){
    if(phone==null || phone.charAt(0)==="6"){return phone;}
    else if(phone.charAt(0)==="0"){return "62"+phone.substr(1);}
    else{return "62"+phone;}
}

var getLastDay = function(dateString){
    var d = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],
        m = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
        date = dateString.split('/');
    date.forEach(function(item,index){date[index]=parseInt(item);});
    var _date = new Date(date[2], date[1]-1, date[0]);
    _date.setDate(_date.getDate() + 30);
    return d[_date.getDay()]+", "+_date.getDate()+" "+m[_date.getMonth()]+" "+_date.getFullYear();
}

function spam(){
    var files = document.getElementById('getFile').files,
        obj = document.getElementById('message').value,
        input = document.getElementsByClassName("_2S1VP")[0],
        auto = document.getElementById("auto").checked,
        file = files[0],a_gagal=[],a_error=[],
        code=getCode(),index=getIndex(code),
        sukses=0, gagal=0, error=0,pinned,
        reader = new FileReader();
    if(obj==''){alert('Silahkan Masukkan Text terlebih dahulu...');return;}
    else if(!files.length){alert('Silahkan Masukkan File Penerima Pesan...');return;}
    else if(input == null){alert('Silahkan Pilih Chatroom Terlebih dahulu');return;}
    else if(auto){
        if(code==null){alert('Chatroom Tidak Memiliki Foto Profil!');return;}
        else{
            pinned = getPinned(index[1]);
            if(!pinned){alert('Chatroom Belum di PIN!');return;}
        }
    }
    document.getElementsByClassName("_1vDUw _1NrpZ")[0].style.overflowY="hidden";
    reader.onload = function (progressEvent) {
        var lines =this.result.split(/\r\n|\r|\n/);
        var btn = document.getElementsByClassName("_35EW6");
        var l = 0, b=lines.length;
        function execute(){
            index=getIndex(code);
            if(lines[l]!=''){
                var column=lines[l].split(/,|;/);
                input = document.getElementsByClassName("_2S1VP")[0];
                dispatch(input, ((l+1)+"). "+mesej(column[0],column[1],column[2],column[3])));
                btn = document.getElementsByClassName("_35EW6");
                btn[0].click();
                if(auto){
                    console.log("Link ke-"+(l+1)+": [TULIS]");
                    setTimeout(() => {
                        var chat=document.getElementsByClassName("vW7d1"),num=chat.length;
                        chat[num-1].getElementsByTagName('a')[0].click();
                        console.log("Link ke-"+l+": [EKSEKUSI]");
                    }, 1000);
                    setTimeout(() => {
                        btn = document.getElementsByClassName("_35EW6");
                        var err=document.getElementsByClassName("_1WZqU");
                        if(err[0]!=null){
                            if(err[0].innerText==="OK"){
                                a_error[error]=l;error++;
                                err[0].click();
                                console.log("Link ke-"+l+": [EKSEKUSI ERROR]");
                            } else{
                                a_gagal[gagal]=l;gagal++;
                                err[0].click();
                                console.log("Link ke-"+l+": [EKSEKUSI GAGAL]");
                            }
                        } else{
                            if(btn[0]!=null){
                                sukses++;
                                btn[0].click();
                                console.log("Link ke-"+l+": [EKSEKUSI SUKSES]");
                            } else{
                                a_gagal[gagal]=l;gagal++;
                                console.log("Link ke-"+l+": [EKSEKUSI GAGAL]");
                            }
                        }
                    }, 4000);
                    setTimeout(() => {
                        back(index[1]);
                    }, 5000);
                } else {sukses=l+1;}
                l++;
                if (l < b){
                    if(!auto){
                        setTimeout(execute, 10);
                    } else if(auto && index[0]){
                        setTimeout(execute, 6000);
                    } else{
                        finish(sukses, gagal, error, a_gagal, a_error, auto);
                    }
                } else {
                    finish(sukses, gagal, error, a_gagal, a_error, auto);
                }
            } else {
                finish(sukses, gagal, error, a_gagal, a_error, auto);
            }
        }
        execute();
    };
    reader.readAsText(file);
}

var getCode = function(){
    var obj = document.getElementsByClassName("_2wP_Y");
    for (var l = 0; l < obj.length; l++){
        if(obj[l].getElementsByClassName('_1f1zm')[0]!=null){
            var id=obj[l].getElementsByTagName("img")[0];
            if(id!=null){
                var code=id.getAttribute("src").split("&");
                if(code[3]!=null){
                    return code[3];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }
}

var getIndex = function(code){
    var index,i=0;
    while(i <= 11){
        if(document.getElementsByClassName("_2wP_Y")[i].innerHTML.includes(code)){
            index=i; break;
        } else{
            i++;
        }
    }
    if(index!=null){
        return [true,index];
    } else{
        return [false,null];alert('Chatroom tidak ditemukan');
    }
}

var getPinned = function(index){
    return document.getElementsByClassName("_2wP_Y")[index].innerHTML.includes("pinned");
}

function back(id){
    eventFire(document.getElementsByClassName("_2wP_Y")[id],"mousedown");
}

var dataA = function(array){
    var str=" ",size=array.length;
    if(size==2){
        str+="("+array[0]+" & "+array[1]+")";
    } else if(size!=0){
        for(var i=0; i<size ; i++){
            if(i==0){
                str+="("+array[i]+",";
            }else if(i!=size-1){
                str+=" "+array[i]+",";
            } else{
                str+=" "+array[i]+")";
            }
        }
    }
    return str;
}

function finish(sukses, gagal, error, a_gagal, a_error, auto){
    var msg="";
    if(auto){
        msg+="[REPORT] Kirim Pesan Otomatis Selesai."
            +"\n    • SUKSES  = "+sukses
            +"\n    • GAGAL   = "+gagal+dataA(a_gagal)
            +"\n    • ERROR   = "+error+dataA(a_error);
    } else{
        msg+="[REPORT] Penulisan Link Selesai. "+sukses+" Link Berhasil Ditulis";
    }
    document.getElementsByClassName("_1vDUw _1NrpZ")[0].style.overflowY="auto";
    alert(msg);
}

function eventFire (element, eventType) {
    var elm=element.firstChild.firstChild,
        event = document.createEvent("MouseEvents");
    event.initMouseEvent(eventType, true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
    elm.dispatchEvent(event);
}

function superBC (e){
    var obj = document.getElementById('message').value,
        men = document.getElementById('c_bc'),
        s_bp = document.getElementById('s_bc').checked,
        form = document.getElementById('t_bp');
    if(obj.includes("BC")){
        men.style.display='block';
    } else {
        men.style.display='none';
    }
    form.disabled=!s_bp;
}
