import Home from '../views/Home/index.vue'
import Center from '../views/Center/index.vue'
import NewsAdd from '../views/news-manage/NewsAdd.vue'
import NewsList from '../views/news-manage/NewsList.vue'
import newsManag from '../views/news-manage/NewsManage.vue'
import EditProduct from '../views/product-manage/EditProduct.vue'
import ProductAdd from '../views/product-manage/ProductAdd.vue'
import ProductList from '../views/product-manage/ProductList.vue'
import UserAdd from '../views/user-manage/UserAdd.vue'
import UserList from '../views/user-manage/UserList.vue'
const router = [
    {
        path: "/Home",
        name:'home',
        component: Home
    },
    {
        path: "/Center",
        name:'center',
        component: Center
    },
    {
        path: "/NewsAdd",
        name:'newsAdd',
        component: NewsAdd
    },
    {
        path: "/NewsList",
        name:'newsList',
        component: NewsList
    },
    {
        path: "/news-manage/edit/:id",
        name:'newsManag',
        component: newsManag
    },
    {
        path: "/EditProduct/:id",
        name:'EditProduct',
        component: EditProduct
    },
    {
        path: "/ProductAdd",
        name:'productAdd',
        component: ProductAdd
    },
    {
        path: "/ProductList",
        name:'productList',
        component: ProductList
    },
    {
        path: "/UserAdd",
        name:'userAdd',
        component: UserAdd,
        isLimit:true
    },
    {
        path: "/UserList",
        name:'userList',
        component: UserList,
        isLimit:true
    },
]
export default router