function Ball(boxObject, scale)
{
    this.box = boxObject;
    this.scaling = scale;
    this.drawObject = drawObject;
}

function drawObject()
{
    pos = this.box.GetPosition();
    radius = this.box.GetFixtureList().GetShape().m_radius;
    
    var context = canvas1.getContext('2d');
    
    // context.beginPath();
    // context.arc(pos.x * this.scaling, pos.y * this.scaling, radius * this.scaling, 0, 2 * Math.PI, false);
    // context.fillStyle = 'green';
    // context.fill();
    // context.closePath();
}