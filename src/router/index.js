import VueRouter from 'vue-router'
import Login from '../components/User/Login'
import Root from '../components/Root'
import Table from '../components/Table/Table'
import PostTable from '../components/Table/PostTable'

const routes = [
    {
        path: '/',
        components:{
            default: Login
        }
    },
    {
        path: '/root',
        components: {
            default: Root
        },
        children: [
            {
                path:'user',
                components: {
                    rootitem: Table
                }
            },
            {
                path: 'post',
                components: {
                    rootitem: PostTable
                }
            }
        ]
    },

]

const router = new VueRouter({ routes })

export default router