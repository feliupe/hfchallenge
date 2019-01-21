import { mount } from '@vue/test-utils'
import InfiniteScroll from '@/components/InfiniteScroll.vue'

function createDataListItem(uniqueId) {

    const componentName = 'GenericComponent'

    const opts = {
        class: {
            [componentName]: true
        },
        style: {
            height: '100px',
            width: '100px'
        }
    }

    return {
        uniqueId,
        component: {
            name: componentName,
            render: (createElement) => createElement('div', opts, [`${uniqueId} rendered!`])
        },
        componentProps: {}
    }
}

function wait (miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

describe('InfiniteScroll.vue', () => {

    it('renders dataList and loadingList', () => {

        const dataList = [
            createDataListItem('id1')
        ]

        const loadingList = [
            {
                ...createDataListItem('id2'),
                loading: true
            }
        ]

        const propsData = {
            dataList,
            loadingList
        }

        const wrapper = mount(InfiniteScroll, {propsData})

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('assert emits last item in view point index', async () => {

        const props = {
            dataList: [
                createDataListItem('id1'),
                createDataListItem('id2'),
                createDataListItem('id3')
            ]
        }

        const infiniteScrollEl = (createElement) => {
            return createElement(InfiniteScroll,
                {
                    props,
                    style: {
                        height: '100px'
                    }
                })
        }

        const wrapper = mount({
            render: (createElement) => createElement('div', [infiniteScrollEl(createElement)])
        })

        const infiniteScroll = wrapper.find(InfiniteScroll)

        /*
            Here I've tried to:
            1 - check if I could scroll somehow, so that the item
            out of the view point would be emitted, but apparently

            scroll behavior is not fully implemented under the hood.

            infinite.vm.scrollToItem('id1')
            > "TypeError: el[0].scrollIntoView is not a function"

            2 - I thought that I could then set the container (InfiniteScroll)
            to be smaller the than the sum of all children heights, but it
            apparently doesn't work as well as the method that returns the boundaries
            return all attributes set to 0

            console.log(infinite.element.getBoundingClientRect())
            > { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 }
        */

       infiniteScroll.trigger('scroll')

        await wait(2000) // wait throttling

        const event = infiniteScroll.emitted().onLastViewedItem
        expect(event).toBeTruthy()
        const payload = event[0]
        expect(payload[0]).toBe(2)
    })
})
