import { useNavigate } from "react-router";
export const ProductCard = (props) => {
  const { productItem, handleDeleteProduct } = props;
  const navigate = useNavigate();
  const redirectToDetails = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <>
      <div className="card h-100">
        <img src={productItem.thumbnail} className="card-img-top" alt="..." />
        <div className="card-body">
          {productItem.stock < 0 ? (
            <span className="badge text-bg-danger">Out Of Stock </span>
          ) : (
            <span className="badge"
            style={{
              color :"rgb(244, 204, 233)",
              backgroundColor :"rgb(125, 28, 74)",

            }}
            >In Stock </span>
          )}
          <h5 className="card-title">{productItem.title}</h5>
        </div>
        <div className="card-footer">
          <button
            className="btn  "
            style={{
              backgroundColor :"rgb(125, 28, 74)",
              color:"white"
            }}
            onClick={() => redirectToDetails(productItem.id)}
          >
            More
          </button>
          <button
            className="btn   mx-2"
            style={{
              backgroundColor:"rgb(244, 204, 233)"
            }}
            onClick={() => handleDeleteProduct(productItem.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
