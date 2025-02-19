describe('Store Crud Test', () => {
  it('Create a new store', () => {
    cy.visit('stores');
    cy.get('#fixedButton').click();

    cy.get('#inputString-Name').type('StoreCypress');
    cy.get('#inputString-City').type('City');

    cy.get('#inputString-State').type('state');
    cy.get('#inputString-Zipcode').type('31000');
    cy.get('[id="inputString-Street Number"]').type('4');
    cy.get('#inputNumber-Latitude').clear().type('1.2');
    cy.get('#inputNumber-Longitude').clear().type('1.2');

    cy.get('[id="inputString-Street Name"]').type('streetName');
    cy.get('[name="submitButton"]').click();
    //Verify data. Normally it is the store with id number 3.
    cy.get('#storeElementGallery3').should('exist')
      .should('contain', 'StoreCypress')
      .should('contain', 'City')
      .find('#divNoImageSet3').should('exist');


  })
  
  it('Read a store using edit mode', () => {
    cy.visit('stores');
    cy.get('#editButton1').click();
    cy.get('#inputString-Name').should('have.value', 'Simple Store');
    cy.get('#inputString-City').should('have.value', 'Simple City D.C');

    cy.get('#inputString-State').should('have.value', 'Simple Country');
    cy.get('#inputString-Zipcode').should('have.value', '31000');
    cy.get('[id="inputString-Street Number"]').should('have.value', '0');
    cy.get('#inputNumber-Latitude').should('have.value', '1');
    cy.get('#inputNumber-Longitude').should('have.value', '2');

    cy.get('[id="inputString-Street Name"]').should('have.value', 'Street Name');

  })
  
  it('Read a store using display mode', () => {
    cy.visit('stores');
    cy.get('#storeElementGallery1').click();
    cy.get('#displayStoreElement1key').should('contain','Name')
    cy.get('#displayStoreElement1value').should('contain','Simple Store')

    cy.get('#displayStoreElement2-0key').should('contain','Street number')
    cy.get('#displayStoreElement2-0value').should('contain','0')

    cy.get('#displayStoreElement2-1key').should('contain','Street name')
    cy.get('#displayStoreElement2-1value').should('contain','Street Name')

    cy.get('#displayStoreElement2-2key').should('contain','City')
    cy.get('#displayStoreElement2-2value').should('contain','Simple City D.C')

    cy.get('#displayStoreElement2-3key').should('contain','State')
    cy.get('#displayStoreElement2-3value').should('contain','Simple Country')

    cy.get('#displayStoreElement2-4key').should('contain','Zip code')
    cy.get('#displayStoreElement2-4value').should('contain','31000')

    cy.get('#displayStoreElement3-0key').should('contain','Latitude')
    cy.get('#displayStoreElement3-0value').should('contain','1')

    cy.get('#displayStoreElement3-1key').should('contain','Longitude')
    cy.get('#displayStoreElement3-1value').should('contain','2')

    cy.get('#displayStoreElement5key').should('contain','Image url')
    cy.get('#displayStoreElement5value').should('contain','/store1.jpeg')
    
  })
  
  it('Update a store', () => {
    cy.visit('stores');
    cy.get('#editButton1').click();

    cy.get('#inputImageUrl-URL').should('have.value', 'http://localhost:5173/store1.jpeg').clear();

    cy.get('#inputString-Name').should('have.value', 'Simple Store').type('Updated');
    cy.get('#inputString-City').should('have.value', 'Simple City D.C').type('Updated');

    cy.get('#inputString-State').should('have.value', 'Simple Country').type('Updated');
    cy.get('#inputString-Zipcode').should('have.value', '31000').clear().type('31001');
    cy.get('[id="inputString-Street Number"]').should('have.value', '0').type('1');
    cy.get('#inputNumber-Latitude').should('have.value', '1').type('.2');
    cy.get('#inputNumber-Longitude').should('have.value', '2').type('.4');

    cy.get('[id="inputString-Street Name"]').should('have.value', 'Street Name').type('Updated');
    cy.get('[name="submitButton"]').click();

    cy.get('#storeElementGallery1').should('exist')
      .should('contain', 'Simple StoreUpdated')
      .should('contain', 'Simple City D.CUpdated')
      .find('#divNoImageSet1').should('exist');

    cy.get('#editButton1').click();

    cy.get('#inputString-Name').should('have.value', 'Simple StoreUpdated');
    cy.get('#inputString-City').should('have.value', 'Simple City D.CUpdated');

    cy.get('#inputString-State').should('have.value', 'Simple CountryUpdated');
    cy.get('#inputString-Zipcode').should('have.value', '31001');
    cy.get('[id="inputString-Street Number"]').should('have.value', '01');
    cy.get('#inputNumber-Latitude').should('have.value', '1.2');
    cy.get('#inputNumber-Longitude').should('have.value', '2.4');

    cy.get('[id="inputString-Street Name"]').should('have.value', 'Street NameUpdated');
  })

  it('Delete a store', () => {
    cy.visit('stores');
    cy.get('#editButton1').click();

    cy.get('[name="deleteButton"]').click();

    cy.contains('List of stores');
    cy.get('#storeElementGallery1').should('not.exist')
    cy.get('#NavigationShopApp').click()
    cy.get('#ShopProductElementGalleryContainer1').should('not.exist')
  })
 
  it('Cancel a store update', () => {
    cy.visit('stores');
    cy.get('#editButton1').click();

    cy.get('#inputString-Name').should('have.value', 'Simple Store').type('Updated');
    cy.get('[name="cancelButton"]').click();

    cy.get('#editButton1').click();

    cy.get('#inputString-Name').should('have.value', 'Street Name');
  })
  
})
  

describe('Test Displays if store doesn t exist ', () => {
  it('Test Display in store form', () => {
    cy.visit('stores/99');
    cy.get('#itemNotFound').should('exist');
  })
})