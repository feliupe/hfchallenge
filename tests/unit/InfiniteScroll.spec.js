import { shallowMount, mount } from '@vue/test-utils'
import InfiniteScroll from '@/components/InfiniteScroll.vue'

describe('InfiniteScroll.vue', () => {


    it('renders dataList and loadingList', () => {

        const dataList = [
            {
                uniqueId: 'id1',
                component: {
                    name: 'GenericComponent',
                    render: (createElement) => createElement('div', 'Rendered!')
                },
                componentProps: {}
            }
        ]

        const loadingList = [
            {
                uniqueId: 'id2',
                loading: true,
            }
        ]

        const propsData = {
            dataList,
            loadingList
        }

        const wrapper = mount(InfiniteScroll, {propsData})

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders props.msg when passed', () => {
        const msg = 'new message'
        const wrapper = shallowMount(InfiniteScroll, {
            propsData: { msg }
        })
        expect(wrapper.text()).toMatch(msg)
    })
})
