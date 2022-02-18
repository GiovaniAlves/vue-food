const formatPrice = ({
   locale,
   currency
} = {
   locale: 'pt-br',
   currency: 'BRL'
}) => {
   return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
   })
}

export {
   formatPrice
}
