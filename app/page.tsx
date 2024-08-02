import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import { getBlogData } from './services/getBlogData';

export default async function Home() {
  const blogData = await getBlogData();
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
