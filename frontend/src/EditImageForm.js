import { Button, ButtonGroup } from 'reactstrap'

function EditImageForm({ updateImage }){
  const options = { 
    default: 'default',
    bw:'black-and-white',
    sepia: 'sepia',
    resize: 'resize',
    border: 'border'};

  function handleClick(evt) {
    evt.preventDefault();
    // console.log(evt.target.id);
    updateImage(evt.target.id);
  }

  return (
    <ButtonGroup>
      {Object.keys(options).map( ele => (
        <Button 
          color='primary'
          onClick={handleClick}
          id={options[ele]}
          key={ele}
        >
          {options[ele]}
        </Button>
      ))}
    </ButtonGroup>
    )
}

export default EditImageForm;