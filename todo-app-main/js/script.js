const form = document.querySelector('form')
const keyword = document.querySelector('.keyword')
const mid = document.querySelector('.mid')
const mod = document.querySelector('.mod')

// filter container
const all = document.querySelector('.alls')
const active = document.querySelector('.actives')
const complete = document.querySelector('.completes')
// button filter
const btnComplete = document.querySelector('.btnComplete')
const btnActive = document.querySelector('.btnActive')
const btnAll = document.querySelector('.btnAll')
const btnClear = document.querySelector('.clrComplete')
const left = document.querySelector('.left')

// fungsi tambah, tandai, hapus
form.addEventListener('submit', function(event){
    event.preventDefault();
    if(keyword.value.length < 3){
        return
    }
    // menambah element dan menjalankan function mark ketika checkbox onchange
    
    all.insertAdjacentHTML('beforeend', `<li><input type="checkbox" onchange=mark(this)><span></span> ${keyword.value.replace(/^./, keyword.value[0].toUpperCase())} <button class="close" onclick=hapus(this)><img src="todo-app-main/images/icon-cross.svg" alt="close"></button></li>`)    
    // reset value keyword
    keyword.value = ''
})


function hapus(e){
    if(e.parentElement.parentElement.classList.contains('alls')){
        e.parentElement.remove()
    }else{
    e.parentElement.remove()
    // console.log(e.parentElement.isEqualNode(all.childNodes[0]))
        for(let i = 0; i < all.childNodes.length; i++){
            if(e.parentElement.isEqualNode(all.childNodes[i])){
                return all.childNodes[i].remove()
            }
        }
    }
}

function mark(e){
    // console.log(e.parentElement.isEqualNode(all.childNodes[0]))
    if(e.parentElement.parentElement.classList.contains('alls')){
        e.parentElement.classList.toggle('complete')
    }else{
        for(let i = 0; i < all.childNodes.length; i++){
            if(e.parentElement.isEqualNode(all.childNodes[i])){
                all.childNodes[i].classList.toggle('complete')
                break
            }
        }
        // e.parentElement.classList.toggle('complete')
        // console.log(e.parentElement)
        
    }
    filterShowCheckbox(e)
}


// Filter

btnComplete.addEventListener('click', filterShow)
btnActive.addEventListener('click', filterShow)
btnAll.addEventListener('click', filterShow)
form.addEventListener('submit', filterShow)

function filterShow(){
    complete.innerHTML = ''
    active.innerHTML = ''
    all.childNodes.forEach(e => {
        if(e.classList.contains('complete')){
            complete.insertAdjacentHTML('beforeend', e.outerHTML)
        }else{
            active.insertAdjacentHTML('beforeend', e.outerHTML)
        }
    })

    // memunculkan element
    const show = document.querySelectorAll('.tampil')
    if(show.length > 0){
        show.forEach(e => e.classList.remove('tampil'))
    }
    if(this.classList.contains('btnComplete')){
        complete.classList.add('tampil')
    }else if(this.classList.contains('btnActive')){
        active.classList.add('tampil')
    }else{
        all.classList.add('tampil')
    }
}



// 
function filterShowCheckbox(element){
    complete.innerHTML = ''
    active.innerHTML = ''
    all.childNodes.forEach(e => {
        if(e.classList.contains('complete')){
            complete.insertAdjacentHTML('beforeend', e.outerHTML)
        }else{
            active.insertAdjacentHTML('beforeend', e.outerHTML)
        }
    })

    // memunculkan element
    // const show = document.querySelectorAll('.tampil')
    // if(show.length > 0){
    //     show.forEach(e => e.classList.remove('tampil'))
    // }
    element.parentElement.parentElement.classList.add('tampil')
}


function clear(){
    const [...complete] = document.querySelectorAll('.complete')
    complete.map(e => e.remove())
}
btnClear.addEventListener('click', clear)


setInterval(function(){
    const [...complete] = all.querySelectorAll('li:not(.complete)')
    const [...li] = document.querySelectorAll('li.complete')
    li.map(e => e.children[0].checked = true)
    complete.map(e => e.children[0].checked = false)
    left.innerHTML = complete.length

    const aktif = document.querySelector('.tampil')
    const cek = document.querySelectorAll('.sedangAktif')
    if(cek.length > 0){
        cek.forEach(e => e.classList.remove('sedangAktif'))
    }
    if(aktif.classList.contains('alls')){
        btnAll.classList.add('sedangAktif')
    }else if(aktif.classList.contains('completes')){
        btnComplete.classList.add('sedangAktif')
    }else{
        btnActive.classList.add('sedangAktif')
    }
},350)

mod.addEventListener('click', function(){
    if(document.body.classList.contains('dark')){
        document.body.classList.replace('dark','light')
        mod.innerHTML = '<img src="todo-app-main/images/icon-moon.svg" alt="">'
    }else{
        document.body.classList.replace('light','dark')
        mod.innerHTML = '<img src="todo-app-main/images/icon-sun.svg" alt="">'
    }
})
