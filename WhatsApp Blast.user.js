// ==UserScript==
// @name         WhatsApp Blast
// @description  Tools yang digunakan untuk mengirim pesan WhatsApp Secara Otomatis.
// @copyright    2018, rzlnhd (https://github.com/rzlnhd/)
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @icon         https://raw.githubusercontent.com/rzlnhd/WhatsApp-Blast/master/assets/icon.png
// @homepageURL  https://github.com/rzlnhd/WhatsApp-Blast
// @supportURL   https://github.com/rzlnhd/WhatsApp-Blast/issues
// @version      3.4.1
// @date         2020-1-22
// @author       Rizal Nurhidayat
// @match        https://web.whatsapp.com/
// @grant        GM_getResourceText
// @grant        GM_xmlhttpRequest
// @grant        GM.getResourceText
// @grant        GM.xmlhttpRequest
// @connect      pastebin.com
// @updateURL    https://openuserjs.org/meta/rzlnhd/WhatsApp_Blast.meta.js
// @downloadURL  https://openuserjs.org/install/rzlnhd/WhatsApp_Blast.user.js
// @resource pnl https://raw.githubusercontent.com/rzlnhd/WhatsApp-Blast/master/assets/panel.html
// ==/UserScript==

// ==OpenUserJS==
// @author       rzlnhd
// ==/OpenUserJS==

/* Global Variables */
var createFromData_id=0,prepareRawMedia_id=0,store_id=0,chat_id=0,send_media,
    Store={},_image,user,version="v3.4.1",upDate="22 Jan 2020",doing=false,alrt=true,
    classPp="jZhyM" /*from profile image*/, classChat = "FTBzM" /*from message in chat*/,
    classErr="_2eK7W._3PQ7V" /*from error message when execute link*/,classIn="_3u328" /*input chat*/,
    classChRoom="X7YrQ" /*from chatroom list*/,classAcChRoom="_3mMX1" /*from active chatroom*/;
/* First Function */
var timer = setInterval(general,1000);
function general(){
    if(document.getElementsByClassName("app")[0] != null){
        var panel = document.getElementById("side");
        var item2 = document.querySelector("header");
        var e = item2.cloneNode(true);loadModule();
        initComponents(e);panel.insertBefore(e, panel.childNodes[1]);initListener();
		console.log("WhatsApp Blast "+version+" - Blast Your Follow Up NOW!");
        clearInterval(timer);
	} else{
		console.log("WhatsApp Blast "+version+" - Waiting for WhatsApp to load...");
    }
}
/* Load WAPI Module for Send Image */
function loadModule(){if (!window.Store) {
    (function () {
        function getStore(modules) {
            let foundCount = 0;
            let neededObjects = [
                { id: "Store", conditions: (module) => (module.Chat && module.Msg) ? module : null },
                { id: "MediaCollection", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.processFiles !== undefined) ? module.default : null },
                { id: "ChatClass", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.Collection !== undefined && module.default.prototype.Collection === "Chat") ? module : null },
                { id: "MediaProcess", conditions: (module) => (module.BLOB) ? module : null },
                { id: "Wap", conditions: (module) => (module.createGroup) ? module : null },
                { id: "ServiceWorker", conditions: (module) => (module.default && module.default.killServiceWorker) ? module : null },
                { id: "State", conditions: (module) => (module.STATE && module.STREAM) ? module : null },
                { id: "WapDelete", conditions: (module) => (module.sendConversationDelete && module.sendConversationDelete.length == 2) ? module : null },
                { id: "Conn", conditions: (module) => (module.default && module.default.ref && module.default.refTTL) ? module.default : null },
                { id: "WapQuery", conditions: (module) => (module.queryExist) ? module : ((module.default && module.default.queryExist) ? module.default : null) },
                { id: "CryptoLib", conditions: (module) => (module.decryptE2EMedia) ? module : null },
                { id: "OpenChat", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.openChat) ? module.default : null },
                { id: "UserConstructor", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.isServer && module.default.prototype.isUser) ? module.default : null },
                { id: "SendTextMsgToChat", conditions: (module) => (module.sendTextMsgToChat) ? module.sendTextMsgToChat : null },
                { id: "SendSeen", conditions: (module) => (module.sendSeen) ? module.sendSeen : null },
                { id: "sendDelete", conditions: (module) => (module.sendDelete) ? module.sendDelete : null }
            ];
            for (let idx in modules) {
                if ((typeof modules[idx] === "object") && (modules[idx] !== null)) {
                    let first = Object.values(modules[idx])[0];
                    if ((typeof first === "object") && (first.exports)) {
                        for (let idx2 in modules[idx]) {
                            let module = modules(idx2);
                            if (!module) {
                                continue;
                            }
                            neededObjects.forEach((needObj) => {
                                if (!needObj.conditions || needObj.foundedModule)
                                    return;
                                let neededModule = needObj.conditions(module);
                                if (neededModule !== null) {
                                    foundCount++;
                                    needObj.foundedModule = neededModule;
                                }
                            });
                            if (foundCount == neededObjects.length) {
                                break;
                            }
                        }

                        let neededStore = neededObjects.find((needObj) => needObj.id === "Store");
                        window.Store = neededStore.foundedModule ? neededStore.foundedModule : {};
                        neededObjects.splice(neededObjects.indexOf(neededStore), 1);
                        neededObjects.forEach((needObj) => {
                            if (needObj.foundedModule) {
                                window.Store[needObj.id] = needObj.foundedModule;
                            }
                        });
                        window.Store.ChatClass.default.prototype.sendMessage = function (e) {
                            return window.Store.SendTextMsgToChat(this, ...arguments);
                        }
                        return window.Store;
                    }
                }
            }
        }

        webpackJsonp([], { 'parasite': (x, y, z) => getStore(z) }, ['parasite']);
    })();
};}
/*=====================================
   Initial Function
=====================================*/
/* Load UI Component */
function initComponents(e){
    let pnl="function"==typeof GM_getResourceText?GM_getResourceText('pnl'):GM.getResourceText('pnl');
    pnl=pnl.replace(/VERSION/g,version);
	e.style.zIndex=0;
    e.style['background-color']='#fed859';
    e.style['justify-content']='flex-start';
    e.style.display='block';
    e.style.height='auto';
    e.style.padding='0px';
	e.innerHTML=pnl;
}
/* Set All Component Listeners */
function initListener(){
	let i, tabs = document.getElementsByClassName("tablinks"), trigs = document.getElementsByClassName("trig"),
        wbHead = document.getElementById("toggleApp"),checkL = document.querySelectorAll("input[type='checkbox']"),
        clk=[blast,prevImg,changeLog],idS=["blast","del","changeLog"];
    wbHead.addEventListener("click",toggleApp);getingData();
    for(i=1 ; i < checkL.length ; i++){checkL[i].addEventListener("click", getPremium)};
    for(i=0 ; i < tabs.length ; i++){tabs[i].addEventListener("click", openMenu)};
	for(i=0 ; i < trigs.length ; i++){trigs[i].addEventListener("click", checking)};
    for(i=0 ; i < clk.length ; i++){document.getElementById(idS[i]).addEventListener("click", clk[i])};
	document.getElementById("getImg").addEventListener("change", prevImg);
	document.getElementById("message").addEventListener("input", superBC);
	tabs[0].click();wbHead.click();
}
/*=====================================
   Main Function
=====================================*/
/* Main Function */
function blast(){
    console.log("Blast!: initial start");
    var files = document.getElementById("getFile").files,
        obj = document.getElementById("message").value,
        input = document.querySelector("div."+classIn+".copyable-text.selectable-text"),
        auto = document.getElementById("auto").checked,
        c_img = document.getElementById("s_mg").checked,
        capt = document.getElementById("capt").value,
        file = files[0],a_gagal=[],a_error=[],code,
        sukses=0, gagal=0, error=0,pinned,
        reader = new FileReader();
    if(getStatus()){if(confirm("Stop WhatsApp Blast?")){setStatus(false)}return}
    else if(obj==''){alert('Silahkan Masukkan Text terlebih dahulu...');return}
    else if(!files.length){alert('Silahkan Masukkan File Penerima Pesan...');return}
    else if(input == null){alert('Silahkan Pilih Chatroom Terlebih dahulu');return}
    else if(auto){
        code=getCode();pinned=getPinned();
        if(!code){alert('Chatroom Tidak Memiliki Foto Profil!');return}
        if(!pinned){alert('Chatroom Belum di PIN!');return}
    }
    console.log("Blast!: onload data");
    reader.onload = function (progressEvent) {
        var lines =this.result.split(/\r\n|\r|\n/),
            btn = document.querySelector("span[data-icon='send']"),
            l = 0, b=lines.length;
        function execute(){
            if(auto && b>101){
                alert('Blast Auto tidak boleh lebih dari 100 Nama!');
                setStatus(false);
            } else if(lines[l]!='' && break_f(lines[l]) && getStatus()){
                var column=lines[l].split(/,|;/);
                input = document.querySelector("div."+classIn+".copyable-text.selectable-text");
                dispatch(input, ((l+1)+"). "+mesej(column[0],column[1],column[2],column[3])));
                var ph = setPhone(column[1]);
                btn = document.querySelector("span[data-icon='send']");
                btn.click();
                if(auto){
                    console.log("Link ke-"+(l+1)+": [TULIS]");
                    setTimeout(() => {
                        var chat=document.getElementsByClassName(classChat),num=chat.length,
                            rm=chat[num-1].querySelectorAll('span[role="button"]');
                        while(rm.length!=0){rm[0].click();rm=getRM()};
                        chat[num-1].getElementsByTagName('a')[0].click();
                        console.log("Link ke-"+l+": [EKSEKUSI]");
                    }, 1000);
                    setTimeout(() => {
                        btn=document.querySelector("span[data-icon='send']");
                        var err=document.querySelector("div."+classErr+"[role='button']");
                        if(err!=null){
                            if(err.innerText=="OK"){
                                a_error[error]=l;error++;
                                err.click();
                                console.log("Link ke-"+l+": [EKSEKUSI ERROR]");
                            } else{
                                a_gagal[gagal]=l;gagal++;
                                err.click();
                                console.log("Link ke-"+l+": [EKSEKUSI GAGAL]");
                            }
                        } else{
                            if(btn!=null){
                                sukses++;
                                btn.click();
                                console.log("Link ke-"+l+": [EKSEKUSI SUKSES]");
                                if(c_img && _image!=null){
                                    sendImg(ph, _image, capt);
                                    console.log("Link ke-"+l+": [GAMBAR SUKSES DIKIRIM]");
                                };
                            } else{
                                a_gagal[gagal]=l;gagal++;
                                console.log("Link ke-"+l+": [EKSEKUSI GAGAL]");
                            }
                        }
                    }, 4000);
                    setTimeout(() => {
                        back(code);
                    }, 5000);
                } else {sukses=l+1;}
                l++;
                if (l < b){
                    if(!auto){
                        setTimeout(execute, 10);
                    } else if(auto){
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
        console.log("Blast!: execute data");
        setStatus(true);execute();
    };
    reader.readAsText(file);
}
/* Main Send Image Function */
function sendImg(num, file, capt){
    var reader = new FileReader();
	num+="@c.us";
    reader.readAsDataURL(file);
    reader.onload = function(){
        window.sendImage(num, reader.result, capt, undefined);
    };
    reader.onerror = function(error) {
        console.log('Error: ', error);
    };
}
/* Create Links Message */
var mesej = function(nama, phone, bp, date){
    var abs_link = 'https://api.whatsapp.com/send?phone=',
        _bp = parseInt(bp),bp_,obj = document.getElementById('message').value,
        c_bc = document.getElementById('s_bc').checked,
        s_bp = document.getElementById('t_bp').value,
        msg = obj.replace(/F_NAMA/g,setName(nama,1)).replace(/NAMA/g,setName(nama,0)),
        t_bp = 100;
    if(obj.includes("BC")){if(c_bc){t_bp=s_bp;}else{t_bp=200;}}
    if(bp!=null){
        if(bp.length<=3){bp_=t_bp-_bp;msg = msg.replace(/P_BP/g,_bp+" BP").replace(/K_BP/g,bp_+" BP");}
        else{msg = msg.replace(/L_DAY/g,getLastDay(bp));}
    }
    if(date!=null){msg = msg.replace(/L_DAY/g,getLastDay(date));}
    var en_msg = encodeURIComponent(msg).replace(/'/g,"%27").replace(/"/g,"%22");
    return abs_link+setPhone(phone)+'&text='+en_msg
}
/* Break When Name is Empty */
var break_f = function(line){
    var column=line.split(/,|;/);
    if(column[0]!=''){return true}
    return false
}
/* Set Name of the Recipient */
var setName = function(nama,opt){
    var fname=nama.split(' '),count=fname.length;
    if(opt==0){
        if(count>1){return titleCase(fname[0])} else{return titleCase(nama)}
    } else{
        var new_name="";
        for(var i=0;i<count;i++){
            if(i==0){new_name+=titleCase(fname[i])} else{new_name+=" "+titleCase(fname[i])}
        }
        return new_name
    }
}
/* Get Read More Button */
var getRM = function(){
    var chat=document.getElementsByClassName(classChat),num=chat.length;
    return chat[num-1].querySelectorAll('span[role="button"]')
}
/* Title Case Text Transform */
var titleCase = function(str) {
    var _str = str.toLowerCase();
    return _str.charAt(0).toUpperCase()+_str.slice(1)
}
/* Set the Recipient's Phone Number */
var setPhone = function(phone){
    if(phone==null || phone.charAt(0)==="6"){return phone}
    else if(phone.charAt(0)==="0"){return "62"+phone.substr(1)}
    else{return "62"+phone}
}
/* Getting Last Day Welcome Program */
var getLastDay = function(dateString){
    var date = dateString.split('/'),i=0,j=0,_date;
    date.forEach(function(item,index){date[index]=parseInt(item);});
    if(date[0]>100){j=2} else{i=2}
    _date = new Date(date[i], date[1]-1, date[j]);
    _date.setDate(_date.getDate() + 30);
    return dateFormat(_date)
}
/* Setting User */
var getUser = function(){
    return user
}
/* Setting User */
function setUser(u){
    user=u
}
/*=====================================
   Utilities Function
=====================================*/
/* Setting "BLAST" Status */
function setStatus(stat){
    var path=document.getElementById("blast"),
        ico=document.getElementById("blastIc"),
        chatList=document.getElementById("pane-side"),
        stopIc="M505.16405,19.29688c-1.176-5.4629-6.98736-11.26563-12.45106-12.4336C460.61647,0,435.46433,0,410.41962,0,307.2013,0,245.30155,55.20312,199.09162,128H94.88878c-16.29733,0-35.599,11.92383-42.88913,26.49805L2.57831,253.29688A28.39645,28.39645,0,0,0,.06231,264a24.008,24.008,0,0,0,24.00353,24H128.01866a96.00682,96.00682,0,0,1,96.01414,96V488a24.008,24.008,0,0,0,24.00353,24,28.54751,28.54751,0,0,0,10.7047-2.51562l98.747-49.40626c14.56074-7.28515,26.4746-26.56445,26.4746-42.84374V312.79688c72.58882-46.3125,128.01886-108.40626,128.01886-211.09376C512.07522,76.55273,512.07522,51.40234,505.16405,19.29688ZM384.05637,168a40,40,0,1,1,40.00589-40A40.02,40.02,0,0,1,384.05637,168ZM35.68474,352.06641C9.82742,377.91992-2.94985,442.59375.57606,511.41016c69.11565,3.55859,133.61147-9.35157,159.36527-35.10547,40.28913-40.2793,42.8774-93.98633,6.31147-130.54883C129.68687,309.19727,75.97,311.78516,35.68474,352.06641Zm81.63312,84.03125c-8.58525,8.584-30.08256,12.88672-53.11915,11.69922-1.174-22.93555,3.08444-44.49219,11.70289-53.10938,13.42776-13.42578,31.33079-14.28906,43.51813-2.10352C131.60707,404.77148,130.74562,422.67188,117.31786,436.09766Z",
        blastIc="M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z";
    if(stat){
        console.log("Blasting...");
        path.setAttribute("title","STOP!");
        ico.setAttribute("d",stopIc);
        chatList.style.overflowY="hidden";
    } else{
        console.log("Stoped.");
        path.setAttribute("title","BLAST!");
        ico.setAttribute("d",blastIc);
        chatList.style.overflowY="auto";
    }
    doing=stat;
}
/* Getting "BLAST" Status */
var getStatus=function(){
    return doing
}
/* Getting code from Selected Chatroom */
var getCode = function(){
    let obj = document.querySelector('div.'+classAcChRoom+' img.'+classPp),
        l=obj.getAttribute('src');
    console.log(l);
    return l
}
/* Getting Pinned Status from Selected Chatroom*/
var getPinned = function(){
    return document.querySelector('div.'+classAcChRoom).innerHTML.includes("pinned")
}
/* Formating Date Data */
var dateFormat = function(e){
    let d = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],
        m = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    return d[e.getDay()]+", "+e.getDate()+" "+m[e.getMonth()]+" "+e.getFullYear()
}
/* Back to the First Chatroom */
function back(a){
    let p=document.querySelectorAll("img[src='"+a+"']"),i=0,elm;
    if(p.length>1){i=1}elm=p[i].parentElement;
    eventFire(elm,"mousedown");
}
/* Make Report Matrix Data */
var dataA = function(array){
    var str=" ",size=array.length;
    if(size==1){
        str+="("+array[0]+")";
    } else if(size==2){
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
    return str
}
/* Show the Report Data */
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
    if(getStatus){setStatus(false)}
    alert(msg);
}
/* EventFire Function */
function eventFire(node, eventType){
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.parentElement.dispatchEvent(clickEvent);
}
/* Dispatch Function */
function dispatch(input, message) {
    InputEvent = Event || InputEvent;
    var evt = new InputEvent('input', {bubbles: true, composer: true});
    input.innerHTML = message;
    input.dispatchEvent(evt);
}
/*=====================================
   Listener Function Handler
=====================================*/
/* Open Super BC Menu */
function superBC(e){
	var obj = this.value,
        msj = document.getElementById('message'),
		men = document.getElementById('c_bc');
	if(obj.includes("BC")){
        msj.style.height='110px';
		men.style.display='block';
	} else {
        msj.style.height=null;
		men.style.display='none';
	}
}
/* Preview the Selected Image File*/
function prevImg(evt){
	var output = document.getElementById('o_img'),
        res=null,del = document.getElementById('del'),
        btn=this.getAttributeNode('data-value'),
        MByte=Math.pow(1024, 2),maxSize=4*MByte;
    if(btn==null){
        res = evt.target.files[0];
        if(res.size<=maxSize){
            _image = res;
        } else{
            alert("Ukuran gambar tidak boleh lebih dari 4MB");
            this.value='';res=null;
        }
    } else{
        document.getElementById(btn.value).value='';
    }
    if(res!=null){
        output.src = URL.createObjectURL(res);
        del.style.display='block';
    } else{
        output.removeAttribute("src");
        del.style.display='none';
    }
}
/* Listeners for Checkbox */
function checking(evt){
    var form = document.getElementById(this.value),
        attr = this.getAttributeNode('capt-id');
    if(attr!=null){document.getElementById(attr.value).disabled=!this.checked}
    form.disabled=!this.checked;
}
/* Toggle Apps Listener */
function toggleApp(evt){
    var butn = evt.currentTarget,id = butn.getAttribute("value"),
        acdBody = document.getElementById(id);
    if(acdBody.style.height){
        acdBody.style.height = null;
        butn.className = butn.className.replace(' active', '');
    } else{
        acdBody.style.height = acdBody.scrollHeight + 'px';
        butn.className+= ' active';
    }
}
/* Tabview Event Listeners */
function openMenu(evt){
	var i, tabcontent, tablinks,menuName=this.value;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '');
	}
	document.getElementById(menuName).style.display = 'block';
	evt.currentTarget.className += ' active';
}
/* Show Change Log */
function changeLog(){
    var cLog="WhatsApp Blast "+version+" (Last Update: "+upDate+").";
    cLog+="\n▫ Mengganti passcode dengan data pengguna."
        +"\n▫ Mengubah nilai BC reguler menjadi 200BP (regulasi baru)."
        +"\n▫ Mengubah minimum nilai Super BC menjadi 100BP."
        +"\n▫ Menambah pemberitahuan info berlangganan."
        +"\n\nVersion v.3.3.3 (18 Jan 2020)."
        +"\n▫ Menetapkan password pada fitur berbayar."
        +"\n\nVersion v.3.3.2 (16 Jan 2020)."
        +"\n▫ Memperbaiki tampilan saat ada kata 'BC'"
        +"\n▫ Mengunci beberapa fitur."
        +"\n\nVersion v3.3.1 (15 Jan 2020)."
        +"\n▫ Menambah fitur tracking error"
        +"\n\nVersion v3.3.0 (13 Jan 2020)."
        +"\n▫ Membatasi data Blast Auto (Max 100 nama)."
        +"\n▫ Membatasi ukuran gambar (Max 4MB)."
        +"\n▫ Menambah fitur untuk menghentikan Blast (Manual/Auto)."
        +"\n▫ Menambah fitur untuk menyematkan Tools."
        +"\n▫ Menambah fitur untuk melihat Change Log."
        +"\n▫ Mengubah selector DOM agar lebih dinamis."
        +"\n▫ Mengganti tampilan tombol Blast.";
    alert(cLog);
}
/* Convert Base64Image To File */
var base64ImageToFile = function(b64Data, filename) {
    var arr = b64Data.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
};
/* Core Send Media Function*/
window.sendImage = function(chatid, imgBase64, caption, done) {
    var idUser = new window.Store.UserConstructor(chatid, { intentionallyUsePrivateConstructor: true });
    var random_name = Math.random().toString(36).substr(2, 5);
    done = undefined;
    return window.Store.Chat.find(idUser).then((chat) => {
        var mediaBlob = base64ImageToFile(imgBase64, random_name);
        var mc = new window.Store.MediaCollection();
        mc.processFiles([mediaBlob], chat, 1).then(() => {
            var media = mc.models[0];
            media.sendToChat(chat, { caption: caption });
            if (done !== undefined) done(true);
        });
    });
}
/*=====================================
   For Credits Purpose
=====================================*/
/* Get User Phone Number */
var getUphone = function(){
    if(!getUser()){
        let a=document.querySelector('header img.'+classPp),
            b=a.getAttribute('src'),
            c=b.split('&');
        return c[2].match(/(\d+)/)[0]
    } else{
        return setPhone(user.phone)
    }
}
/* Getting User Data */
function getingData(){
    let a={
        overrideMimeType: "application/json",
        method: "GET",
        url: "https://pastebin.com/raw/XzqwSJ6h",
        onload: function(req) {
            let usr=JSON.parse(req.responseText).users;setUser(null);
            for(let i=0;i<usr.length;i++){
                if(setPhone(usr[i].phone)==getUphone()){
                    setUser(usr[i]);i=user.length;
                }
            }
        },
    },b="function"==typeof GM_xmlhttpRequest?GM_xmlhttpRequest(a):GM.xmlHttpRequest(a);
    setTimeout(getingData,10000);
}
/* Is Premium? */
var isPremium = function(){
    return isSubsribe(getUser())
}
/* Is Subscibed */
var isSubsribe = function(u){
    if(u){
        let today=new Date(),e=new Date(u.reg);
        e.setMonth(e.getMonth()+u.mon);
        if(today.getTime()<=e.getTime()){getAlrt(e);return true}
    }
    return false
}
/* Inform to the Subscriber */
function getAlrt(e){
    let str=dateFormat(e);
    if(alrt){
        alert("Halo kak "+setName(getUser().name,1)+"!"
              +"\nSelamat menggunakan fitur Pengguna Premium."
              +"\nMasa aktif Kakak sampai dengan "+str+" ya...");
        alrt=false
    }
}
/* Get Premium User */
function getPremium(e){
    if(e.currentTarget.checked){
        if(!isPremium()){
            alert('Maaf, fitur ini hanya untuk Pengguna Premium.'
                  +'\nTampaknya Anda belum terdaftar sebagai Pengguna Premium,'
                  +'\nAtau masa berlangganan Anda mungkin telah habis.'
                  +'\n\nInformasi lebih lanjut, silahkan hubungi saya.');
            e.currentTarget.checked=false;
        }
    }
}
