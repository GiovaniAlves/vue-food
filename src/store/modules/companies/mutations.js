export default {
   SET_COMPANIES (state, companies) {
      state.items = companies
   },
   SET_COMPANY_SELECTED (state, company) {
      /* Utilizei o Object assign pq seu passase apenas a (company) ele não passaria as categorias e os produtos tbm e eu ficaria
          sem essas propriedades, por isso mesclo o objeto companySelected com a company para não perder as propriedades (cat e prod) */
      state.companySelected = Object.assign(state.companySelected, company)
   },
   SET_CATEGORIES_COMPANY (state, categories) {
      state.companySelected.categories = categories
   },
   SET_PRODUCTS_COMPANY (state, products) {
      state.productsInCompanySelected = products
   }
}
