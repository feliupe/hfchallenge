// https://docs.cypress.io/api/introduction/api.html

// This value should be loaded from the same
// place as 'ITEMS_CHUNK_SIZE' on store.js is loaded.
// Maybe a 'constants.js' file.
const ITEMS_CHUNK_SIZE = 6

// The exact same function exist on `InfiniteScroll.vue`
// but it's important that the code is not reused.
function isInViewPoint (el, document, window) {
    const bounding = el.getBoundingClientRect()

    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth))
}

function waitAndAssertItemsLoading(
    expectedLoading,
    expectedReady
) {
    cy.get('.InfiniteScrollItem.type-loading')
        .should('be.visible')
        .its('length')
        .should('be.equal', expectedLoading)

    cy.get('.InfiniteScrollItem.type-loading')
        .should('not.be.visible')

    cy.get('.InfiniteScrollItem:not(.type-loading)')
        .should('be.visible')
        .its('length')
        .should('be.equal', expectedReady)
}

describe('Test InfiniteScroll', () => {

    beforeEach(() => {
        cy.clearLocalStorage()
    })

    it(`items should load and appear in chunks of ${ITEMS_CHUNK_SIZE}`, () => {
        cy.visit('/')

        waitAndAssertItemsLoading(ITEMS_CHUNK_SIZE, ITEMS_CHUNK_SIZE)

        cy.get('.InfiniteScroll')
            .scrollTo('bottom')

        waitAndAssertItemsLoading(ITEMS_CHUNK_SIZE, ITEMS_CHUNK_SIZE * 2)
    })

    it('last visible item should be visible after refresh', function () {

        cy.visit('/')

        waitAndAssertItemsLoading(ITEMS_CHUNK_SIZE, ITEMS_CHUNK_SIZE)

        cy.get('.InfiniteScroll')
        .scrollTo('bottom')

        waitAndAssertItemsLoading(ITEMS_CHUNK_SIZE, ITEMS_CHUNK_SIZE * 2)

        cy.get('.InfiniteScroll')
        .scrollTo('bottom')

        cy.wait(2000) // wait 'scroll' throttling

        // here we should have items from the second loading/page
        cy.window().as('window')
        cy.document().as('document')

        cy.get('.InfiniteScrollItem:not(.type-loading)')
            .then(function ($items) {
                var $last
                for (var $item of $items) {
                    if (isInViewPoint($item, this.document, this.window)) {
                        $last = $item
                    }
                }
                cy.wrap('.' + $last.className.split(' ').join('.')).as('nextPageItemSelector')
            })

        // move away
        cy.reload()

        cy.visit('/')

        waitAndAssertItemsLoading(ITEMS_CHUNK_SIZE, ITEMS_CHUNK_SIZE)

        cy.get('@nextPageItemSelector')
            .then(nextPageItemSelector => cy.get(nextPageItemSelector))
            .then($selectorResult=> {
                const visible = isInViewPoint($selectorResult[0], this.document, this.window)
                cy.wrap(visible).should('be.equal', true)
            })

    })
})
