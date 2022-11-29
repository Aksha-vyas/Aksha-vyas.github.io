import { withRouter } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';
import { ReactSession } from 'react-client-session';

class ProductAdd extends React.Component {
  constructor() {
      super();
      this.submit = this.submit.bind(this);
      this.state ={ barcodeForAdding : ReactSession.get("barcodeForAdding")?ReactSession.get("barcodeForAdding"):""};
  }
  componentDidMount(){  

  }
  async addProduct(product) {
      const query = `
          mutation addProduct($product: ProductInputs!) {
              addProduct(product: $product) {
                  id
                  name
                  price
                  barcode
                  quantity
                  dateOfExpiry
              } 
          }`;
      const data = await graphQLFetch(query, { product });
      return data;
  }
  submit(e) {
      e.preventDefault();
      const form = document.forms.productAdd;
      const product = {
          id: parseInt(form.id.value),
          name: form.name.value,
          price: parseFloat(form.price.value),
          quantity: parseInt(form.quantity.value),
          dateOfExpiry: form.dateOfExpiry.value?new Date(form.dateOfExpiry.value):new Date(2099, 11, 31),
          barcode:form.barcode.value
      }
      const response = this.addProduct(product);
      console.log("response + _++++"+ JSON.stringify(response))
      const { history } = this.props;
      history.push({
        pathname: '/products',
      });
  }

  render() {
      const fieldstyles = {
          width: '50%',
          padding: '12px 20px',
          margin: '8px 0',
          display: 'inline-block',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxSizing: 'border-box',
          fontWeight: 'bolder'
      };
      const buttonStyles = {
          width: '50%',
          backgroundColor: '#000000',
          color: 'white',
          padding: '12px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
      }
      const {barcodeForAdding} = this.state
      return (
          <form name="productAdd" onSubmit={this.submit}>
              <div>
              <label class="labelstyles" htmlFor="id">Product Id</label>
              <input class="fieldstyles" type="text" name="id" placeholder="Product Id" style={fieldstyles} required />
              </div>
              <div>
              <label class="labelstyles" htmlFor="name">Product Name</label>
              <input class="fieldstyles" type="text" name="name" placeholder="Password" style={fieldstyles} required />
              </div>
              <div>
              <label class="labelstyles" htmlFor="barcode">Barcode</label>
              <input class="fieldstyles" type="text" name="barcode" placeholder="barcode" style={fieldstyles} defaultValue={barcodeForAdding} required />
              </div>    
              <div>
              <label class="labelstyles" htmlFor="price">Price</label>
              <input class="fieldstyles" type="text" name="price" placeholder="Price" style={fieldstyles} required />
              </div>          
              <div>
                <label class="labelstyles" htmlFor="dateOfExpiry">Date of Expiry</label>
                <input class="fieldstyles" type="date" name="dateOfExpiry" placeholder="Date of Expiry" style={fieldstyles} required />
                </div>
              <div>
              <label class="labelstyles" htmlFor="quantity">Quantity</label>
              <input class="fieldstyles" type="text" name="quantity" placeholder="Quantity" style={fieldstyles} required />
              </div>
              
              <button type="submit" style={buttonStyles}>Add Product</button>
          </form>
      )
  }
}
export default withRouter(ProductAdd);