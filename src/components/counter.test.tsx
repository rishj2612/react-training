import Counter from './counter';
import { render, screen } from '@testing-library/react'

test("mount counter", () => {

    render(<Counter count={5} />)
    const text = screen.getByText("Count : 5");
    expect(text).toBeInTheDocument();

});