import Counter from './counter';
import { render, screen,fireEvent } from '@testing-library/react'

test("mount counter", () => {

    render(<Counter count={5} />)
    const text = screen.getByText("Count : 5");
    expect(text).toBeInTheDocument();
});

test("increment counter", () => {

    render(<Counter count={5} />)
    let text = screen.getByText("Count : 5");
    expect(text).toBeInTheDocument();

    const incBtn = screen.getByText("++");
    fireEvent.click(incBtn);

    text = screen.getByText("Count : 7");
    expect(text).toBeInTheDocument();

    const inputField = screen.getByPlaceholderText("Enter the new count");
    fireEvent.change(inputField,{target:{value:"123"}});

    const updateBtn = screen.getByText("Update Count");
    fireEvent.click(updateBtn);


    text = screen.getByText("Count : 123");
    expect(text).toBeInTheDocument();
});