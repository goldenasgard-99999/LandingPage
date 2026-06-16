export interface Project {
  id: string;
  name: string;
  location: string;
  priceRange: string;
  turnover: string;
  image: string;
  shortDescription: string;
}

export const projects: Project[] = [
  {
    id: 'el-sol',
    name: 'El Sol Cebu',
    location: 'Mactan, Cebu',
    priceRange: '₱31k / month',
    turnover: '2028',
    image: '/EL.jpg',
    shortDescription: 'A leisure residential development located inside Seagrove Estate in Punta Engaño, offering the ultimate resort lifestyle.',
  },
  {
    id: 'city-clou',
    name: 'City Clou Cebu',
    location: 'Cebu City Center',
    priceRange: '₱15k / month',
    turnover: '2027',
    image: '/city-clou.webp',
    shortDescription: 'Cebu City’s first-ever mixed-use development with dedicated residential, office, and retail towers.',
  }
];
