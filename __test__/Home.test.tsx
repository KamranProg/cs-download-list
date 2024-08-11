import Home from '@/app/page'
import { render, screen } from '@testing-library/react'

describe('Home', () => {
    it('should have Docs text', () => {
        render(<Home />) // ARRANGE 

        const myElem = screen.getByText('FileList') // ACT 

        expect(myElem).toBeInTheDocument() // ASSERT
    })
})