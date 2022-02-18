import { formatPrice } from '@/helpers'

export default {
   methods: {
      formatPrice (value) {
         return formatPrice().format(value)
      }
   }
}
