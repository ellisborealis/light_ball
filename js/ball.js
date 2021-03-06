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
    
    context1.beginPath();
    context1.arc(pos.x * this.scaling, pos.y * this.scaling, radius * this.scaling, 0, 2 * Math.PI, false);
    context1.fillStyle = 'green';
    context1.fill();
    context1.closePath();
}