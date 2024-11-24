document.addEventListener('DOMContentLoaded', () => {
  //Experience Model
  const fullExperienceBtn = document.getElementById('full-experience')
  const mutedExperienceBtn = document.getElementById('muted-experience')

  if (fullExperienceBtn)
    fullExperienceBtn.addEventListener('click', fullExperience)
  if (mutedExperienceBtn)
    mutedExperienceBtn.addEventListener('click', semiExperience)

  //Call to action button
  const ctaBtn = document.getElementById('cta-btn')
  if (ctaBtn) ctaBtn.addEventListener('click', playAudioAndRedirect)

  //Add to cart button
  setUpAdd()

  //Delete from cart button
  const cartMain = document.querySelector('.cart')
  if (cartMain) {
    setUpDeleteButton()
  }
})

function fullExperience () {
  const index_bg_audio = document.getElementById('index_bg_audio')
  const index_bg_video = document.getElementById('main-page-background')
  const popup = document.getElementById('experience-model')

  if (index_bg_audio && index_bg_video && popup) {
    index_bg_audio.play()
    index_bg_video.muted = false
    index_bg_video.play()
    popup.style.display = 'none'
  }
}

function semiExperience () {
  const index_bg_video = document.getElementById('main-page-background')
  const popup = document.getElementById('experience-model')

  if (index_bg_video && popup) {
    index_bg_video.muted = true
    index_bg_video.play()
    popup.style.display = 'none'
  }
}

function playAudioAndRedirect () {
  const indexBody = document.querySelector('#index')
  const index_bg_audio = document.getElementById('index_bg_audio')
  const btn = document.getElementById('cta-btn')
  const background_vid = document.getElementById('main-page-background')
  const skull_vid = document.getElementById('skull')
  const audio = document.getElementById('cta-audio')
  const transitionAudio = document.getElementById('trans-audio')

  if (index_bg_audio) index_bg_audio.muted = true
  if (btn) btn.style.display = 'none'
  scrollToPosition(6)
  toggleVideo(background_vid, skull_vid)

  if (audio) {
    audio.play()
    audio.addEventListener('ended', () => transitionAudio?.play(), {
      once: true
    })
  }

  if (skull_vid) {
    skull_vid.addEventListener(
      'ended',
      () => {
        window.location.href = '/MysteriousArtifacts/products'
      },
      { once: true }
    )
  }
}

function toggleVideo (inactiveVid, activeVid) {
  if (inactiveVid && activeVid) {
    inactiveVid.classList.replace('active', 'inactive')
    activeVid.classList.replace('inactive', 'active')
    activeVid.play()
  }
}

function scrollToPosition (yPercentage) {
  const scrollTargetY = document.body.scrollHeight * (yPercentage / 100)
  const scrollTargetX = document.body.scrollWidth

  window.scrollTo({
    left: scrollTargetX,
    top: scrollTargetY,
    behavior: 'smooth'
  })
}

function setUpAdd () {
  const products = document.querySelectorAll('.product-item')

  products.forEach(product => {
    const addButton = product.querySelector('.add-to-cart-button')
    if (addButton) {
      addButton.addEventListener('click', () => sendToCart(product)) // Corrected to use arrow function
    }
  })
}

function sendToCart(product) {
  const itemIDInput = product.querySelector('.itemID');
  if (!itemIDInput) {
    alert('Item ID not found!');
    return;
  }

  let id = itemIDInput.value;
  let params = { product_id: id };

  fetch('/MysteriousArtifacts/add', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then(response => {
      if (response.status === 401) {
        window.location.href = '/auth/login';
      } else if (response.ok) {
        window.location.href = '/MysteriousArtifacts/cart';
      } else {
        throw new Error('Failed to add to cart');
      }
    })
    .catch(error => console.error('Error:', error));
}


function setUpDeleteButton () {
  const products = document.querySelectorAll('.cart-item')

  products.forEach(product => {
    const productId = product.dataset.productId
    console.log('Product ID:', productId)

    const button = product.querySelector('.remove-item-button')
    if (button) {
      button.addEventListener('click', () => deleteProduct(productId));
    }
  })
}

function deleteProduct (productID) {
  console.log('Product id to delete ', productID)
  let params = { productID: productID }

  fetch('/MysteriousArtifacts/remove', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
    .then(checkStatus)
    .then(reload)
    .catch(error => console.error('Error:', error))
}

function reload () {
  location.reload()
}

function loadCart () {
  location.href = "/MysteriousArtifacts/cart"
}
function checkStatus (response) {
  if (!response.ok) {
    throw new Error('Error in request: ' + response.statusText)
  }
  return response
}
