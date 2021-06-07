const urlForm = document.querySelector('#urlForm')
const shortUrl = document.querySelector('#shortUrl')
const getUrl = document.querySelector('#getUrl')
const extError = document.querySelector('#error')
const copyUrl = document.querySelector('#copy-url')


urlForm.addEventListener('submit', (e) => {
    extError.innerHTML = ''
    copyUrl.style.display = 'none'
    extError.style.color = '#c9140e'
    e.preventDefault()
    const formData = new FormData(urlForm)
    const data = {
        url: formData.get('url'),
        slug: formData.get('keyword')
    }
    const url = '/addUrl'
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            copyUrl.style.display = 'block'
            shortUrl.value = `https://nanofy-od692.ondigitalocean.app/${data.url}`
            getUrl.addEventListener('click', ()=>{
                shortUrl.select();
                shortUrl.setSelectionRange(0, 99999)
                document.execCommand("copy");
                extError.style.color = '#55c57a'
                extError.innerHTML = 'copied to clipboard !'
            })
        } else if (data.message) {
            if(data.message){
                extError.innerHTML = data.message
            } else {
                extError.innerHTML = `something went wrong`
            }
        } else {
            extError.innerHTML = `something went wrong`
        }
    })
    
})