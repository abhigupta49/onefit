import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Input, Button, Switch, Box, Typography } from '@mui/material';
import { ChevronDown, Filter, Columns, Edit, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const productsData = [
  { id: 1, name: "Photive wireless speakers", type: "Electronics", inStock: true, sku: "2384741241", price: 65, variants: 2, image: "https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=40&width=40" },
  { id: 2, name: "Topman shoe", type: "Shoes", inStock: true, sku: "4124123847", price: 21, variants: 4, image: "https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=40&width=40" },
  { id: 3, name: "RayBan black sunglasses", type: "Accessories", inStock: false, sku: "8472341241", price: 37, variants: 1, image: "https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=40&width=40" },
  { id: 4, name: "Mango Women's shoe", type: "Shoes", inStock: true, sku: "2412384741", price: 65, variants: 3, image: "https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=40&width=40" },
  { id: 5, name: "Calvin Klein t-shirts", type: "Clothing", inStock: false, sku: "8234741241", price: 89, variants: 7, image: "https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=40&width=40" },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(productsData); // Manage products state
  const navigate = useNavigate(); // Initialize useNavigate

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle switch toggle
  const handleSwitchChange = (id) => {
    setProducts((prevProducts) => 
      prevProducts.map((product) => 
        product.id === id ? { ...product, inStock: !product.inStock } : product
      )
    );
  };

  const handleEditClick = (id) => {
    navigate(`/admin/ProductDetails/${id}`); // Navigate to the ProductDetails page
  };

  return (
    <div className="container mx-auto p-16 md:p-32">
      <div className="flex justify-between items-center mb-4">
        <Input
          type="search"
          placeholder="Search products"
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <Button variant="outlined" size="small">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outlined" size="small">
            <Columns className="h-4 w-4 mr-2" />
            Columns
            <span className="ml-2 rounded-full bg-primary w-6 h-6 flex items-center justify-center text-primary-foreground text-xs">6</span>
          </Button>
        </div>
      </div>

      {/* Responsive Table for Larger Screens */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="w-[300px]">PRODUCT <ChevronDown className="h-4 w-4 inline-block ml-2" /></TableCell>
              <TableCell>TYPE <ChevronDown className="h-4 w-4 inline-block ml-2" /></TableCell>
              <TableCell>STOCKS</TableCell>
              <TableCell>SKU <ChevronDown className="h-4 w-4 inline-block ml-2" /></TableCell>
              <TableCell>PRICE <ChevronDown className="h-4 w-4 inline-block ml-2" /></TableCell>
              <TableCell>VARIANTS <ChevronDown className="h-4 w-4 inline-block ml-2" /></TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <img src={product.image} alt={product.name} className="w-10 h-10 mr-3 rounded" />
                    {product.name}
                  </div>
                </TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>
                  <Switch
                    checked={product.inStock}
                    onChange={() => handleSwitchChange(product.id)} // Update stock status on toggle
                  />
                </TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.variants}</TableCell>
                <TableCell>
                  <Button variant="text" size="small" onClick={() => handleEditClick(product.id)}> {/* Use handleEditClick for navigation */}
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="text" size="small">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Mobile-Friendly Card Layout */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {filteredProducts.map((product) => (
          <Box key={product.id} sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={product.image} alt={product.name} className="w-10 h-10 mr-3 rounded" />
              <Typography variant="h6">{product.name}</Typography>
            </Box>
            <Typography>Type: {product.type}</Typography>
            <Typography>SKU: {product.sku}</Typography>
            <Typography>Price: ${product.price}</Typography>
            <Typography>Variants: {product.variants}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
              <Switch
                checked={product.inStock}
                onChange={() => handleSwitchChange(product.id)} // Update stock status on toggle
              />
              <Typography variant="body2">In Stock</Typography>
              <Button variant="text" size="small" sx={{ marginLeft: 'auto' }} onClick={() => handleEditClick(product.id)}> {/* Use handleEditClick for navigation */}
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="text" size="small">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
}
