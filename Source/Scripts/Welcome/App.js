

document.getElementById('ask').addEventListener('click',async () => {
    
    console.log('Asking for permissions')
    
    await browser.permissions.request({
        origins : [ '<all_urls>' ]
    })
})
