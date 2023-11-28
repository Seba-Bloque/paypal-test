export function Index() {
  return (<h1>HELLO WORLD</h1>)
}

export async function getServerSideProps(req: any) {
  return {
    props: {}
  };
}

export default Index;