import { div, h1, h2, img, p, text } from '../lib/vnodes/html'

// Helper function to create text elements
export const Text = (tag, data) => tag([text(data)])

// Image transition helper function for smooth image transitions
export const createImageTransition = (dispatch, currentIndex, newIndex, images) => {
  if (newIndex === currentIndex || dispatch.state?.isTransitioning) {
    return
  }

  const transitionId = Date.now()
  const preloadImage = new Image()
  preloadImage.src = images[newIndex].src

  preloadImage.onload = () => {
    dispatch(state => {
      state.baseImage = currentIndex !== undefined ? images[currentIndex] : null
      state.selectedImageIndex = newIndex
      state.currentTransitionId = transitionId
      state.isTransitioning = true
      state.fadeIn = false
      return { state }
    })

    setTimeout(() => {
      dispatch(state => {
        if (state.currentTransitionId !== transitionId) return { state }
        state.fadeIn = true
        return { state }
      })

      const cleanupDelay = 300 + 100 // 300ms for CSS transition, 100ms buffer

      setTimeout(() => {
        dispatch(state => {
          if (state.currentTransitionId !== transitionId) {
            return { state }
          }
          state.baseImage = null
          return { state }
        })

        setTimeout(() => {
          dispatch(state => {
            if (state.currentTransitionId !== transitionId) {
              return { state }
            }
            state.isTransitioning = false
            state.fadeIn = false
            state.currentTransitionId = null
            return { state }
          })
        }, 20) // Small delay for repaint
      }, cleanupDelay)
    }, 50) // Delay before starting fade-in
  }

  // Handle error case for image loading
  preloadImage.onerror = () => {
    // If image fails to load, just update the index without transition
    dispatch(state => {
      state.selectedImageIndex = newIndex
      return { state }
    })
  }

  // If the image is already cached, the onload event might not fire
  if (preloadImage.complete) {
    preloadImage.onload()
  }
}

// Reusable Product Component with image carousel/thumbnails
export const ProductComponent = (props) => {
  // Destructure the required props from the props object
  const {
    title,
    images,         // An array of image objects: [{src, alt}]
    children, // New prop for content
    currentImageIndex, // The index of the currently displayed image
    onImageSelect     // Callback function when an image is selected
  } = props

  // Get the current primary image or use a default
  const primaryImage = images && images.length > 0 && images[currentImageIndex]
    ? images[currentImageIndex]
    : { src: '/cache/tile.png', alt: 'Product image' }

  return div({ class: 'pdp-product' }, [
    div({ class: 'pdp-image-container' }, [
      // Base image (always visible)
      img({
        src: props.baseImage ? props.baseImage.src : primaryImage.src,
        alt: props.baseImage ? props.baseImage.alt : primaryImage.alt,
        class: 'pdp-image pdp-image-base',
        loading: 'eager',
      }),
      // Next image (only shown during transition, initially transparent)
      props.isTransitioning && img({
        src: primaryImage.src,
        alt: primaryImage.alt,
        class: 'pdp-image pdp-image-next' + (props.fadeIn ? ' -fadeIn' : ''),
        loading: 'eager',
      }),
      // Alt text overlay in a small black box with white text
      div({
        class: 'pdp-image-alt-overlay',
      }, [
        text(primaryImage.alt || 'Image')
      ])
    ]),
    // Thumbnail grid
    images && images.length > 1 && div({ class: 'pdp-thumbnail-grid' }, [
      ...images.map((image, index) => (
        div({
          class: 'pdp-thumbnail-container' + (index === currentImageIndex ? ' -active' : ''),
          onclick: () => onImageSelect && onImageSelect(index)
        }, [
          img({
            src: image.src,
            alt: `Thumbnail ${index + 1}`,
            class: 'pdp-thumbnail'
          })
        ])
      ))
    ]),
    div({ class: 'pdp-content' }, [
      Text(h2, title || 'Product Details'),
      ...(children || []),
    ])
  ])
}
