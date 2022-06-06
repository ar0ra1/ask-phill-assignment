# ask-phill-assignment

## Stack

- NextJS
- Axios
- SWR
- Tailwind

## Performance things...

- Google fonts slows down the app
- useRef v/s useState (also added to future enhancements)

## Could have done differently...

- Filter page with context, so each filter gets its own component. In a real world case, Yes but good enough for assignment (I guess !?)

## Future Enhancements

- [ ] Add number validation for input fields (e.g., min shouldn't be greater than max etc.)
- [x] Mobile CSS
- [ ] Sorting (currently only on name; asc)
- [ ] Elegant solution to fix update on color and category callback
- [ ] useRef (debate how much of the application is being re-rendered because of useState)
- [x] memo FilterComponent to stop re-render when just changing pages
- [x] replace useEffect with useMemo
