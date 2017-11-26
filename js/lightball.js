function LightBall(boxObject, scale)
{
    this.box = boxObject;
    this.scaling = scale;
    this.drawObject = drawLightObject;
}

function drawLightObject()
{
    pos = this.box.GetPosition();
    radius = this.box.GetFixtureList().GetShape().m_radius;
    
    var context = canvas2.getContext('2d');
    
    context.beginPath();
    context.arc(pos.x * this.scaling, pos.y * this.scaling, 20 * radius * this.scaling, 0, 2 * Math.PI, false);
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
    
    context.beginPath();
    context.arc(pos.x * this.scaling, pos.y * this.scaling, radius * this.scaling, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
    context.closePath();
}