import { div, h1 } from '../lib/vnodes/html'
import main from './_main'
// Import the shared components
import { Text, createImageTransition, ProductComponent } from './pdp-components'

const Pdp = (state, dispatch) => {
  // Initialize state for tracking the selected image index if it doesn't exist
  if (state.selectedImageIndex === undefined) {
    dispatch(state => {
      state.selectedImageIndex = 0
      return { state }
    })
  }

  // Sample product data - in a real app, this could come from an API or props
  const sampleProduct = {
    title: 'Premium Product',
    images: [
      { src: '/cache/tile.png', alt: 'Premium product main image' },
      { src: '/cache/tile.png', alt: 'Premium product side view' },
      { src: '/cache/tile.png', alt: 'Premium product detail view' },
      { src: '/cache/tile.png', alt: 'Premium product alternate view' }
    ],
    currentImageIndex: state.selectedImageIndex,
    prevImageIndex: state.prevImageIndex,
    isTransitioning: state.isTransitioning,
    onImageSelect: (index) => {
      // Use the extracted transition helper function
      createImageTransition(dispatch, state.selectedImageIndex, index, sampleProduct.images)
    },
    description: 'This is a sample product description. The image above shows the product from its best angle. This product is designed to showcase the implementation of a PDP (Product Display Page) in a minimalist web framework.',
    additionalText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, in dignissim nulla. Aliquam erat volutpat. Aenean eget iaculis dui.',
    features: [
      {
        title: 'Minimal',
        description: 'Clean design with minimal dependencies'
      },
      {
        title: 'Fast',
        description: 'Optimized for speed and performance'
      },
      {
        title: 'Responsive',
        description: 'Looks great on all devices'
      },
      {
        title: 'Accessible',
        description: 'Built with accessibility in mind'
      }
    ]
  }

  return div({ class: 'pdp' }, [
    div({ class: 'head' }, [
      Text(h1, 'Product Display')
    ]),

    // Render the product with all the necessary props for transitions
    ProductComponent({
      ...sampleProduct,
      baseImage: state.baseImage,
      fadeIn: state.fadeIn,
      isTransitioning: state.isTransitioning
    })
  ])
}

export default {
  view: main(Pdp),
  onroute: () => {}
}
