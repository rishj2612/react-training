import Counter from "@/components/counter";
import Hello from "@/components/Hello";

export default function Home() {
  return (
    <div>
      <h2>React Next.js Applications</h2>
      <Hello message="Hello React" color="blue"/>
      <Hello message="Hello Next.js" color="red"/>
      <Counter count={5}></Counter>
  
    </div>
  );
}
