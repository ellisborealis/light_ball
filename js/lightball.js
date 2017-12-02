function LightBall(boxObject, scale)
{
    this.box = boxObject;
    this.scaling = scale;
    this.drawObject = drawLightObject;
}

function drawLightObject()
{
    pos = this.box.GetPosition();
    m_radius = this.box.GetFixtureList().GetShape().m_radius;
    
    var context = canvas2.getContext('2d');

    var lightRadius = 20 * m_radius * this.scaling;
    var actualRadius = m_radius * this.scaling;
    var xPos = pos.x * this.scaling;
    var yPos = pos.y * this.scaling;
    
    // draw light
    context.beginPath();
    context.moveTo(xPos, yPos);
    context.arc(xPos, yPos, lightRadius, 0, 2 * Math.PI, false);

    for(var o in otherObjects)
    {
        var oPos = otherObjects[o].box.GetPosition();
        var xPosO = oPos.x * this.scaling;
        var yPosO = oPos.y * this.scaling;
        var oRad = otherObjects[o].box.GetFixtureList().GetShape().m_radius;
        var a = xPosO - xPos;
        var b = yPosO - yPos;
        var distance = Math.sqrt((a*a)+(b*b));
        if(distance < lightRadius + oRad)
        {   
            var startPoint = Math.atan(b/a) + (Math.PI / 2);
            context.moveTo(xPosO, yPosO);
            if(a < 0)   
            {
                context.arc(xPosO, yPosO, oRad * this.scaling, startPoint, startPoint + Math.PI, true);
            }
            else
            {
                context.arc(xPosO, yPosO, oRad * this.scaling, startPoint - Math.PI, startPoint, true);
            }
            
        }
        // console.log('here');
    }
    
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();

    // draw center ball
    context.beginPath();
    context.arc(xPos, yPos, m_radius * this.scaling, 0, 2 * Math.PI, false);
    context.fillStyle = '#fff';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#003300';
    context.stroke();
    context.closePath();
}