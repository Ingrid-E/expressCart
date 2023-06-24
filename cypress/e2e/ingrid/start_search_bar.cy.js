describe('Search Bar', () => {
  beforeEach(() => {
    cy.visit('/'); // Assuming the search bar is on the homepage
  });

  it('should display the search bar', () => {
    cy.get('input#frm_search').should('be.visible');
  });

  it('should allow entering search text', () => {
    const searchText = 'shoes';

    cy.get('input#frm_search')
      .type(searchText)
      .should('have.value', searchText);
  });


  it('should display search results', () => {
    const searchText = 'blusa';

    cy.get('input#frm_search')
      .type(searchText)
      .type('{enter}');

    cy.get('a[data-id="6490f6e8c5355a2f54a1a551"]').should('be.visible');
  });

  it('should display placeholder text', () => {
    const placeholderText = 'Search shop';

    cy.get('input#frm_search')
      .should('have.attr', 'placeholder', placeholderText);
  });
});
